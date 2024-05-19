<script setup lang="ts">
import StarSearch from '@/components/StarSearch.vue';
import StarMap from '@/components/Modules/StarMap/StarMap.vue';
import { ref } from 'vue';
import { type Star } from '@/types/Star';
const starMap = ref<InstanceType<typeof StarMap> | undefined>(undefined);

const setStar = (star: Star) => {
	if (!starMap.value) return;
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	starMap.value.onSelectStar(star);
};
</script>

<template>
	<div class="map-page">
		<StarSearch @set-star="setStar" />
		<StarMap ref="starMap" />
	</div>
</template>

<style scoped lang="postcss">
.map-page {
	display: flex;
	width: 100vw;
	height: 100vh;
}
</style>
