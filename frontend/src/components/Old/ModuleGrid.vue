<script setup lang="ts">
import { ref } from 'vue';
import Module from './Module.vue';
import { ModuleGrid, ModuleGridItem } from '../types/ModuleGrid';
import ModuleSpawner from './ModuleSpawner.vue';

defineProps<{
    moduleGrid: ModuleGrid;
}>();

const moduleContainer = ref<HTMLElement | null>(null);
const draggedModule = ref<ModuleGridItem | null>(null);

const createNewModule = (module: ModuleGridItem, event: PointerEvent) => {};
</script>

<template>
    <div class="grid-container">
        <table class="grid">
            <tr class="row" v-for="row in moduleGrid.shape">
                <td
                    class="cell"
                    v-for="cell in row"
                    :class="{ active: cell.active }"
                ></td>
            </tr>
        </table>
    </div>

    <div class="module-container">
        <Module v-for="module in moduleGrid.modules" :module="module" />
    </div>

    <div v-if="draggedModule" class="dragged-module">
        <Module :module="draggedModule" :static="true" />
    </div>

    <ModuleSpawner
        :moduleShape="[
            [true, false],
            [true, true],
        ]"
        :createNewModule="createNewModule"
    />
</template>

<style scoped lang="scss">
.grid-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.grid {
    border-collapse: collapse;
    display: inline-table;
    border: 1px solid transparent;
}
.cell {
    width: 8rem;
    height: 8rem;
    transition: background-color 0.3s ease-in-out;

    &.active {
        border: 1px solid rgba(255, 255, 255, 0.3);
    }
}
</style>
../types/Module
