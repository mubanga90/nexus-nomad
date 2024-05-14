<script setup lang="ts">
import Module from './Module.vue';
import {
    ModuleGrid,
    ModuleGridItem,
    ModuleGridPickedUpValues,
} from '../../types/ModuleGrid';
import { dropModule, moveModule, pickUpModule } from './helpers/DragDrop';
import { ref } from 'vue';

const props = defineProps<{
    moduleGridProp: ModuleGrid;
}>();

const moduleGrid = ref(props.moduleGridProp);
const pickedUpModule = ref<ModuleGridItem | null>(null);
const pickedUpValues = ref<ModuleGridPickedUpValues>({
    position: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    valid: false,
});

const handlePickup = (event: PointerEvent, module: ModuleGridItem) => {
    if (pickedUpModule.value !== null || !event.target) return;
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleDrop);

    const { modules, values } = pickUpModule(
        event,
        module,
        moduleGrid.value.modules
    );
    moduleGrid.value.modules = modules;
    pickedUpModule.value = module;
    pickedUpValues.value = values;
};

const handleMove = (event: PointerEvent) => {
    if (!event || !pickedUpModule.value) return;
    const { module, values }  = moveModule(event, pickedUpModule.value, pickedUpValues.value);
    pickedUpModule.value = module;
    pickedUpValues.value = values;
};

const handleDrop = (event: PointerEvent) => {
    if (!event || !pickedUpModule.value) return;
    window.removeEventListener('pointermove', handleMove);
    window.removeEventListener('pointerup', handleDrop);
    moduleGrid.value.modules = dropModule(
        event,
        pickedUpModule.value,
        pickedUpValues.value,
        moduleGrid.value.modules
    );

    pickedUpModule.value = null;
};
</script>

<template>
    <div class="grid-container">
        <div class="grid" :style="`--columns: ${moduleGrid.shape[0].length}`">
            <template class="row" v-for="row in moduleGrid.shape">
                <div
                    class="cell"
                    v-for="cell in row"
                    :data-x="cell.x"
                    :data-y="cell.y"
                    :class="{ active: cell.active }"
                />
            </template>
        </div>

        <div class="module-container">
            <Module
                v-for="module in moduleGrid.modules"
                :module="module"
                :onpointerdown="(event: PointerEvent) => handlePickup(event, module)"
            />
        </div>

        <Module
            v-if="pickedUpModule"
            :module="pickedUpModule"
            :valid="pickedUpValues.valid"
            :pickedUp="true"
            :style="{
                transform: `translate(${pickedUpValues.position.x}px, ${pickedUpValues.position.y}px)`,
            }"
        />
    </div>
</template>

<style scoped lang="scss">
.grid-container {
    position: relative;
    height: fit-content;
    width: fit-content;

    .grid {
        --columns: 5;
        display: grid;
        grid-template-columns: repeat(var(--columns), calc(8rem - 1px));
        opacity: 0.3;
        gap: 1px;

        .cell {
            width: calc(8rem - 1px);
            height: calc(8rem - 1px);

            &.active {
                outline: 1px solid white;
            }
        }
    }
}
</style>
