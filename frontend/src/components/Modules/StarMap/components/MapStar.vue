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
	<circle
		class="star"
		:class="star.classification"
		:cx="star.position.x"
		:cy="star.position.y"
		r="1vw"
	></circle>
</template>

<style scoped lang="postcss">
.star {
	cursor: pointer;
	position: absolute;
	transform: translate(calc(-50%), -50%);
	fill: white;

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
