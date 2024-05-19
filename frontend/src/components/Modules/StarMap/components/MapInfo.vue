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
	isCurrentStar: {
		type: Boolean,
		required: false,
		default: false,
	},
});

const emit = defineEmits(['set-current-star', 'plot-route']);

const handleSetStar = () => {
	emit('set-current-star', properties.selectedStar);
};

const handlePlotRoute = () => {
	emit('plot-route', properties.selectedStar);
};
</script>

<template>
	<div
		v-if="selectedStar"
		class="info"
		:style="{
			transform: `translate(calc(${selectedStar.position.x}px - 50%), calc(${selectedStar.position.y}px - 100%))  scale(${1 / scale}) translateY(calc(-16px * ${scale})`,
		}"
	>
		<h2 class="header">
			<span class="name">
				{{ selectedStar.name }}
			</span>

			<template v-if="!isCurrentStar">
				<i class="icon iconoir-select-point-3d" @click="handleSetStar" />
				<i class="icon iconoir-bridge-3d" @click="handlePlotRoute" />
			</template>
			<i v-else class="iconoir-map-pin" />
		</h2>
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
	left: 0;
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
		display: flex;
		gap: 0.5rem;
		align-items: center;

		margin: 0;
		padding: 0.5rem 1rem;

		font-size: 1.25rem;

		border-bottom: 1px solid rgba(255, 255, 255, 0.3);

		> .name {
			flex-grow: 2;
		}

		> .icon {
			cursor: pointer;
			opacity: 0.5;
			transition: opacity 0.2s ease-in-out;

			&:hover {
				opacity: 1;
			}
		}
	}

	.content {
		padding: 0rem;
		font-size: 0.875rem;
	}
}
</style>
