<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { convertGalaxy } from '@/GalaxyGenerator/GalaxyJsonHandlers';

import galaxy from '@/data/galaxy.json';
const stars = convertGalaxy(galaxy);

const container = ref(null);

const minScale = computed(() => {
	if (!container.value) return 1;
	const containerElement = container.value as HTMLElement;
	const galaxyWidth = stars.reduce(
		(max, star) => Math.max(max, star.position.x, star.position.y),
		0
	);

	const scale = containerElement.clientHeight / (galaxyWidth * 2);

	return scale;
});

const scale = ref(1);
const xOffset = ref(0);
const yOffset = ref(0);
const dragging = ref(false);

onMounted(() => {
	scale.value = minScale.value;
});

const onZoom = (event: Event) => {
	if (event.type === 'wheel') {
		const wheelEvent = event as WheelEvent;
		const delta = wheelEvent.deltaY;
		let newScale = scale.value + delta / 1000;

		if (newScale < minScale.value) newScale = minScale.value;

		if (newScale > 1) newScale = 1;

		// Zoom to mouse position
		if (container.value) {
			const containerElement = container.value as HTMLElement;
			const rect = containerElement.getBoundingClientRect();
			const mouseX = wheelEvent.clientX - (rect.left + rect.width / 2);
			const mouseY = wheelEvent.clientY - (rect.top + rect.height / 2);

			console.log(mouseX, wheelEvent.clientX, rect.left, rect.width / 2);

			const oldScale = scale.value;

			const ratio = 1 - newScale / oldScale;
			const xDiff = (mouseX - xOffset.value) * ratio;
			const yDiff = (mouseY - yOffset.value) * ratio;

			xOffset.value += xDiff;
			yOffset.value += yDiff;
		}

		scale.value = newScale;
	}
};

const startDrag = (event: MouseEvent) => {
	dragging.value = true;
	let startX = event.clientX;
	let startY = event.clientY;

	const move = (event: MouseEvent) => {
		const deltaX = event.clientX - startX;
		const deltaY = event.clientY - startY;

		xOffset.value += deltaX;
		yOffset.value += deltaY;

		if (xOffset.value > 0) xOffset.value = 0;
		if (yOffset.value > 0) yOffset.value = 0;

		startX = event.clientX;
		startY = event.clientY;
	};

	const stopDrag = () => {
		dragging.value = false;
		window.removeEventListener('mousemove', move);
		window.removeEventListener('mouseup', stopDrag);
	};

	window.addEventListener('mousemove', move);
	window.addEventListener('mouseup', stopDrag);
};
</script>

<template>
	<div class="module starmap">
		<h1 class="header">StarMap</h1>
		<div class="content" ref="container">
			<div
				class="container"
				:class="{ dragging: dragging }"
				@wheel="onZoom"
				@pointerdown="startDrag"
			>
				<div
					class="anchor"
					:style="{
						transform: `translate(${xOffset}px, ${yOffset}px) scale(${scale}) `,
					}"
				>
					<div
						v-for="star in stars"
						class="star"
						:class="star.classification"
						:style="{
							top: star.position.y + 'px',
							left: star.position.x + 'px',
						}"
					></div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="postcss">
.module {
	box-sizing: border-box;
	width: 100%;
	max-width: 30rem;
	border: 1px solid rgba(255, 255, 255, 0.3);
}

.header {
	pointer-events: none;

	margin: 0;
	padding: 0.5rem 1rem;

	font-size: 1.5rem;

	border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

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

	.star {
		position: absolute;

		width: 10px;
		height: 10px;

		background-color: white;
		border-radius: 50%;

		&.O {
			opacity: 1;
		}

		&.B {
			opacity: 0.9;
		}

		&.A {
			opacity: 0.8;
		}

		&.F {
			opacity: 0.7;
		}

		&.G {
			opacity: 0.6;
		}

		&.K {
			opacity: 0.5;
		}

		&.M {
			opacity: 0.4;
		}
	}
}
</style>
