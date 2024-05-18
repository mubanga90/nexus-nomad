<script setup lang="ts">
import { type PropType } from 'vue';
import type { Star } from '@/types/Star';

const properties = defineProps({
	selectedStar: {
		type: Object as PropType<Star | undefined>,
		required: false,
		default: undefined,
	},
	scale: {
		type: Number,
		required: true,
		default: 1,
	},
});
</script>

<template>
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
</template>

<style scoped lang="postcss">
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
