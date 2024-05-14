<script setup lang="ts">
import { PropType, computed } from 'vue';
import { ModuleGridItem } from '../../types/ModuleGrid';

const props = defineProps({
    static: {
        type: Boolean,
        default: false,
        reqruired: false,
    },
    module: {
        type: Object as PropType<ModuleGridItem>,
        required: true,
    },
    pickedUp: {
        type: Boolean,
        required: false,
    },
    valid: {
        type: Boolean,
        required: false,
    },
});

const position = computed(() => {
    console.log(props.pickedUp && !props.valid)
    if (props.pickedUp && !props.valid || !props.module.gridPosition) return { x: 0, y: 0}

    return {
        x: props.module.gridPosition.x * 128,
        y: props.module.gridPosition.y * 128,
    };
});
</script>

<template>
    <div
        class="module"
        :style="{ transform: `translate(${position.x}px, ${position.y}px)` }"
        :class="{ 'picked-up': pickedUp, valid }"
    >
        <div
            class="row"
            v-for="(row, y) in module.shape"
            :style="{ display: 'flex' }"
        >
            <template v-for="(cell, x) in row">
                <div
                    class="cell"
                    v-if="cell"
                    :style="{
                        transform: `translate(${100 * x}%, ${100 * y}%)`,
                    }"
                ></div>
            </template>
        </div>
    </div>
</template>

<style scoped lang="scss">
.module {
    position: absolute;
    top: 0;
    left: 0;

    .cell {
        position: absolute;
        box-sizing: border-box;
        width: 8rem;
        height: 8rem;

        &::after {
            content: '';
            position: absolute;
            inset: 1rem;
            background-color: rgba(255, 255, 255, 0.3);
            transition: background-color 0.3s ease-in-out;
        }
    }

    &.picked-up {
        pointer-events: none;
        .cell::after {
            background-color: rgba(255, 255, 255, 0.2);
        }
    }

    &.valid {
        background-color: rgba(255, 255, 255, 0.6);
    }
}
</style>
