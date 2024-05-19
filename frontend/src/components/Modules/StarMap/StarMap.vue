<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

import usePlayerStore from '@/store/Player';

import type { Star } from '@/types/Star';
import useDragAndZoom from '@/composables/UseDragAndZoom';

import MapInfo from './components/MapInfo.vue';
import MapStar from './components/MapStar.vue';
import calculateViewBoxAndScale from './helpers/CalculateViewBoxAndScale';
import lerp from '@/utils/Lerp';
import findPath from '@/utils/AStar';

const playerStore = usePlayerStore();
const { currentStarIndex } = storeToRefs(playerStore);

const stars = ref<Star[]>(inject('$galaxy')!);

const content = ref(undefined);
const selectedStar = ref<Star | undefined>(undefined);
const minScale = ref(1);
const viewbox = ref<number>();
const xOffsetTarget = ref(0);
const yOffsetTarget = ref(0);

const path = ref<Star[]>([]);

let moveAnimationFrame: number | undefined;

const { scale, onStartDrag, isDragging, onZoom, xOffset, yOffset } =
	useDragAndZoom(content, minScale);

onMounted(() => {
	const { calculatedMinScale, calculatedViewBox } = calculateViewBoxAndScale(
		content.value!,
		stars.value
	);
	scale.value = calculatedMinScale;
	minScale.value = calculatedMinScale;
	viewbox.value = calculatedViewBox;
});

const lerpMove = () => {
	xOffset.value = lerp(xOffset.value, xOffsetTarget.value, 0.4);
	yOffset.value = lerp(yOffset.value, yOffsetTarget.value, 0.4);
	if (
		Math.abs(xOffset.value - xOffsetTarget.value) > 0.1 ||
		Math.abs(yOffset.value - yOffsetTarget.value) > 0.1
	) {
		moveAnimationFrame = requestAnimationFrame(lerpMove);
		return;
	}

	xOffset.value = xOffsetTarget.value;
	yOffset.value = yOffsetTarget.value;
};

const onSelectStar = (star: Star) => {
	selectedStar.value = star;
	if (content.value === undefined) return;

	const x = -star.position.x * scale.value;
	const y = -star.position.y * scale.value + 80;

	xOffsetTarget.value = x;
	yOffsetTarget.value = y;

	moveAnimationFrame = requestAnimationFrame(lerpMove);
};

const handleScroll = (event: WheelEvent) => {
	onZoom(event);
	if (moveAnimationFrame) cancelAnimationFrame(moveAnimationFrame);
};

const hanldePointerDown = (event: PointerEvent) => {
	onStartDrag(event);
	if (moveAnimationFrame) cancelAnimationFrame(moveAnimationFrame);
};

defineExpose({
	onSelectStar,
});
</script>

<template>
	<div ref="content" class="star-map">
		<div
			class="container"
			:class="{ dragging: isDragging }"
			@wheel="handleScroll"
			@pointerdown="hanldePointerDown"
		>
			<div
				class="anchor"
				:style="{
					transform: `translate(${xOffset}px, ${yOffset}px) scale(${scale}) `,
				}"
			>
				<svg
					v-if="viewbox"
					class="stars"
					:viewBox="`-${viewbox} -${viewbox} ${viewbox} ${viewbox}`"
					:width="viewbox"
					:height="viewbox"
				>
					<polyline
						v-if="path.length > 0"
						:points="
							path
								.map((star) => `${star.position.x}, ${star.position.y}`)
								.join(' ')
						"
					/>
					<MapStar
						v-for="star in stars"
						:key="star.id"
						:star="star"
						@click="() => onSelectStar(star)"
					></MapStar>
				</svg>
				<MapInfo
					:selected-star="selectedStar"
					:scale="scale"
					@set-current-star="(star) => (currentStarIndex = star.id)"
					@plot-route="
						(star) => (path = findPath(stars, currentStarIndex, star.id, 500))
					"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped lang="postcss">
.star-map {
	overflow: hidden;
	width: 100%;
	height: 100%;
}

.container {
	cursor: grab;

	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;

	height: 100%;

	&.dragging {
		cursor: grabbing;
	}

	.anchor {
		position: relative;
	}

	.stars {
		position: absolute;
		transform: translate(-50%, -50%);

		polyline {
			transform: translate(-50%, -50%);

			opacity: 0.5;

			fill: none;
			stroke: white;
			stroke-width: 0.5vw;
		}
	}
}
</style>
