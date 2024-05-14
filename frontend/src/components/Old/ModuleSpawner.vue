<script setup lang="ts">
import { ModuleGridItem } from '../types/ModuleGrid';
import Module from './Module.vue';
const props = defineProps<{
    moduleShape: boolean[][];
    createNewModule: (moduleShape: ModuleGridItem, event: PointerEvent) => void;
}>();

const handleOnPointerDown = (module: ModuleGridItem, event: PointerEvent) => {
    props.createNewModule(module, event);
};
</script>

<template>
    <div class="spawner" :onpointerdown="handleOnPointerDown">
        <Module static :module="{ shape: moduleShape }" />
    </div>
</template>

<style scoped lang="scss"></style>
