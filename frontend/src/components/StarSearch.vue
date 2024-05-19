<script setup lang="ts">
import { computed, inject } from 'vue';
import type { Star } from '@/types/Star';

import usePlayerStore from '@/store/Player';
import { storeToRefs } from 'pinia';
import calculateDistanceBetweenStars from '@/utils/CalculateDistanceBetweenStars';

const playerStore = usePlayerStore();
const { currentStarIndex } = storeToRefs(playerStore);
const searchInput = defineModel('searchInput', {
	type: String,
	default: '',
});
const emit = defineEmits(['set-star']);

const handleStarClick = (star: Star) => {
	emit('set-star', star);
};

const stars: Star[] = inject('$galaxy')!;
const currentStar = computed(() => stars[currentStarIndex.value]);
const starsWithDistance = computed(() => {
	const filtered = stars
		.filter((star: Star) => filterStars(star))
		.map((star: Star) => ({
			...star,
			distance: calculateDistanceBetweenStars(
				currentStar.value.position,
				star.position
			),
		}))
		.sort((a, b) => a.distance - b.distance);
	return filtered;
});

const filterStars = (star: Star) => {
	if (!searchInput.value) return true;
	return star.name.toLowerCase().includes(searchInput.value.toLowerCase());
};
</script>

<template>
	<div class="star-search">
		<input
			v-model="searchInput"
			class="star-search-input"
			type="text"
			placeholder="Search for a star"
		/>
		<div class="star-list">
			<div
				v-for="star in starsWithDistance"
				:key="star.id"
				class="star-list-item"
				@click="() => handleStarClick(star)"
			>
				<i v-if="currentStarIndex! === star.id" class="iconoir-map-pin" />
				<div class="star-name">{{ star.name }}</div>
				<div>{{ star.distance.toFixed(2) }} ly</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="postcss">
.star-search {
	display: flex;
	flex-direction: column;

	box-sizing: border-box;
	width: 24rem;
	height: 100vh;

	border-right: 1px solid rgba(255, 255, 255, 0.3);
}

.star-search-input {
	padding: 1rem;

	font-family: 'Abel', sans-serif;
	font-size: 1rem;
	color: white;

	background-color: transparent;
	border: none;
	border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.star-list {
	overflow-y: auto;
	margin-top: 1rem;
	padding: 0 1rem;
}

.star-list-item {
	cursor: pointer;

	position: relative;

	display: flex;
	gap: 0.5rem;
	align-items: center;
	justify-content: space-between;

	padding: 0.5rem 0;

	border-bottom: 1px solid rgba(255, 255, 255, 0.1);

	&::after {
		content: '';

		position: absolute;
		inset: -1px -1rem;
		transform-origin: left center;
		transform: scaleX(0);

		opacity: 0;
		background-color: rgba(255, 255, 255, 0.05);

		transition:
			transform 0.3s ease-in-out,
			opacity 0.3s ease-in-out;
	}

	&:hover::after {
		transform: scaleX(1);
		opacity: 1;
	}

	.star-name {
		flex-grow: 2;
	}
}
</style>
