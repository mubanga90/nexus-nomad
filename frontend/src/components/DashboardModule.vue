<script setup lang="ts">
const properties = defineProps({
	name: { type: String, required: false, default: '' },
});
</script>

<template>
	<div class="module">
		<h1 class="header">{{ name }}</h1>
		<div ref="container" class="content">
			<slot></slot>
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
</style>
