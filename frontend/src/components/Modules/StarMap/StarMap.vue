<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import type { Star } from '@/types/Star';

import { convertGalaxy } from '@/GalaxyGenerator/GalaxyJsonHandlers';
import useDragAndZoom from '@/composables/UseDragAndZoom';

import DashboardModule from '@/components/DashboardModule.vue';
import MapInfo from './components/MapInfo.vue';
import MapStar from './components/MapStar.vue';

import galaxy from '@/data/galaxy.json';
const stars = convertGalaxy(galaxy);

const content = ref(undefined);
const selectedStar = ref<Star | undefined>(undefined);

const minScale = computed(() => {
	if (!content.value) return 1;
	const containerElement = content.value as HTMLElement;
	// eslint-disable-next-line unicorn/no-array-reduce
	const galaxyWidth = stars.reduce(
		(max, star) => Math.max(max, star.position.x, star.position.y),
		0
	);

	const scale = containerElement.clientHeight / (galaxyWidth * 2);

	return scale;
});

const { scale, onStartDrag, isDragging, onZoom, xOffset, yOffset } =
	useDragAndZoom(content, minScale);

onMounted(() => {
	scale.value = minScale.value;
});

const onSelectStar = (star: Star) => {
	selectedStar.value = star;
	if (content.value === undefined) return;

	const x = -star.position.x * scale.value;
	const y = -star.position.y * scale.value + 80;

	xOffset.value = x;
	yOffset.value = y;
};
</script>

<template>
	<DashboardModule name="Star Map">
		<div ref="content">
			<div
				class="container"
				:class="{ dragging: isDragging }"
				@wheel="onZoom"
				@pointerdown="onStartDrag"
			>
				<div
					class="anchor"
					:style="{
						transform: `translate(${xOffset}px, ${yOffset}px) scale(${scale}) `,
					}"
				>
					<MapStar
						v-for="star in stars"
						:key="star.id"
						:star="star"
						@click="() => onSelectStar(star)"
					></MapStar>
					<MapInfo :selected-star="selectedStar" :scale="scale" />
				</div>
			</div>
		</div>
	</DashboardModule>
</template>

<style scoped lang="postcss">
.starmap .container {
	cursor: grab;

	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;

	height: 20rem;

	&.dragging {
		cursor: grabbing;
	}

	.anchor {
		position: relative;
	}
}
</style>
@/composables/UseDragAndZoom
