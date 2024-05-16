<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import createGalaxy from '@/galaxyCreator/CreateGalaxy';

const container = ref(null);

const galaxSettings = {
	arms: 3,
	stars: 5000,
	width: 5000,
	deviationFromArm: 1000,
	spiralAngle: 1,
};

const galaxSettings2 = {
	arms: 1,
	stars: 5000,
	width: 1000,
	deviationFromArm: 100,
	spiralAngle: 0,
};

const stars = createGalaxy(galaxSettings);

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

onMounted(() => {
	scale.value = minScale.value;
});

const onZoom = (event: Event) => {
	if (event.type === 'wheel') {
		const wheelEvent = event as WheelEvent;
		const delta = wheelEvent.deltaY;
		const newScale = scale.value + delta / 1000;
		if (newScale < minScale.value) {
			scale.value = minScale.value;
			return;
		}

		if (newScale > 1) {
			scale.value = 1;
			return;
		}

		scale.value = newScale;
	}
};
</script>

<template>
	<div class="module starmap">
		<h1 class="header">StarMap</h1>
		<div class="content" ref="container">
			<div class="container" @wheel="onZoom">
				<div class="anchor" :style="{ transform: `scale(${scale})` }">
					<div
						v-for="star in stars"
						class="star"
						:style="{
							top: star.position.y + 'px',
							left: star.position.x + 'px',
							opacity: star.brightness,
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
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;

	height: 20rem;

	.anchor {
		position: relative;
	}

	.star {
		position: absolute;

		width: 10px;
		height: 10px;

		background-color: white;
		border-radius: 50%;
	}
}
</style>
