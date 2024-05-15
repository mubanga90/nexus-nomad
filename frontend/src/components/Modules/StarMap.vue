<script setup lang="ts">
import StarMap from '@/StarMap.json';
import type { Star } from '@/types/Star';
const stars: Star[] = StarMap;
</script>

<template>
	<div class="module starmap">
		<h1 class="header">StarMap</h1>
		<div class="content"></div>
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

.content {
	padding: 1rem;
}

.starmap .content {
	overflow: hidden;

	.star {
		position: absolute;
		width: 1px;
		height: 1px;
		background-color: white;
	}
}
</style>
