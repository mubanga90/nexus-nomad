<script setup lang="ts">
import { type PropType } from 'vue';
import { type Star } from '@/types/Star';

const properties = defineProps({
	star: {
		type: Object as PropType<Star>,
		required: true,
	},
});
</script>

<template>
	<div
		class="star"
		:class="star.classification"
		:style="{
			top: star.position.y + 'px',
			left: star.position.x + 'px',
		}"
	></div>
</template>

<style scoped lang="postcss">
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
</style>
