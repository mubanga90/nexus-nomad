<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { convertGalaxy } from '@/GalaxyGenerator/GalaxyJsonHandlers';
import type { Star } from '@/types/Star';

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
const selectedStar = ref<Star | null>(null);

onMounted(() => {
	// scale.value = minScale.value;
	scale.value = 1;
});

const onZoom = (event: Event) => {
	if (container.value === null) return;
	if (event.type === 'wheel') {
		const wheelEvent = event as WheelEvent;
		const delta = wheelEvent.deltaY;
		let newScale = scale.value + delta / 1000;

		if (newScale < minScale.value) newScale = minScale.value;

		if (newScale > 1) newScale = 1;

		const containerElement = container.value as HTMLElement;
		const rect = containerElement.getBoundingClientRect();
		const mouseX = wheelEvent.clientX - (rect.left + rect.width / 2);
		const mouseY = wheelEvent.clientY - (rect.top + rect.height / 2);

		const oldScale = scale.value;

		const ratio = 1 - newScale / oldScale;
		const xDiff = (mouseX - xOffset.value) * ratio;
		const yDiff = (mouseY - yOffset.value) * ratio;

		xOffset.value += xDiff;
		yOffset.value += yDiff;

		scale.value = newScale;
	}
};

const onSelectStar = (star: Star) => {
	selectedStar.value = star;
	if (container.value === null) return;
	const containerElement = container.value as HTMLElement;
	const rect = containerElement.getBoundingClientRect();

	const x = -star.position.x * scale.value;
	const y = -star.position.y * scale.value + rect.height / 3;

	xOffset.value = x;
	yOffset.value = y;
};

const startDrag = (event: MouseEvent) => {
	dragging.value = true;
	let startX = event.clientX;
	let startY = event.clientY;

	const move = (event: MouseEvent) => {
		if (container.value === null) return;
		const rect = (container.value as HTMLElement).getBoundingClientRect();

		const deltaX = event.clientX - startX;
		const deltaY = event.clientY - startY;

		xOffset.value += deltaX;
		yOffset.value += deltaY;

		// if (xOffset.value > rect.width) xOffset.value = rect.width;
		// if (yOffset.value > rect.height) yOffset.value = rect.height;
		// if (xOffset.value < -rect.width) xOffset.value = -rect.width;
		// if (yOffset.value < -rect.height) yOffset.value = -rect.height;

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
						@click="() => onSelectStar(star)"
					></div>

					<div
						v-if="selectedStar"
						class="info"
						:style="{
							transform: `translate(calc(${selectedStar.position.x}px + 50%), calc(${selectedStar.position.y}px - 100%))  scale(${1 / scale}) translateY(calc(-16px * ${scale})`,
						}"
					>
						<h2 class="header">{{ selectedStar.name }}</h2>
						<div class="content">
							<ul>
								<li>
									Position: {{ selectedStar.position.x }},
									{{ selectedStar.position.y }}
								</li>
								<li>Classification: {{ selectedStar.classification }}</li>
							</ul>
						</div>
					</div>
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
		cursor: pointer;

		position: absolute;
		transform: translate(calc(-50%), -50%);

		width: 11px;
		height: 11px;

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

.info {
	position: absolute;
	top: 0;
	right: 0;
	transform-origin: bottom center;

	width: 15rem;

	color: white;

	/* background: rgba(0, 0, 0, 0.1); */
	backdrop-filter: blur(10rem);
	border: 1px solid rgba(255, 255, 255, 0.3);

	::after {
		content: '';

		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);

		width: 0;
		height: 16px;

		border: 8px solid transparent;
		border-top-color: rgba(255, 255, 255, 0.2);
	}

	.header {
		margin: 0;
		padding: 0.5rem 1rem;
		font-size: 1.25rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.3);
	}

	.content {
		padding: 0rem;
		font-size: 0.875rem;
	}
}
</style>
