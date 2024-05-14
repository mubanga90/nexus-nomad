<script setup lang="ts">
import { PropType, ref } from 'vue';
import { ModuleGridItem } from '../types/ModuleGrid';

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
});

let pickedUp = ref(false);
let valid = ref(false);
let offset = ref({ x: 0, y: 0 });
let offsetCenter = ref({ x: 0, y: 0 });
let position = ref({ x: 0, y: 0 });

const handlePointerDown = (event: PointerEvent) => {
    if (!event.target || props.static) return;
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handleRelease);
    pickedUp.value = true;
    offset.value = {
        x: event.clientX - position.value.x,
        y: event.clientY - position.value.y,
    };

    const rect = (event.target as HTMLElement).getBoundingClientRect();

    offsetCenter.value = {
        x: rect.left + rect.width / 2 - position.value.x,
        y: rect.top + rect.height / 2 - position.value.y,
    };
};

const handlePointerMove = (event: PointerEvent) => {
    if (checkCurrentPosition(event.target as HTMLElement | null)) {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        const cellCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        };
        position.value = {
            x: cellCenter.x - offsetCenter.value.x,
            y: cellCenter.y - offsetCenter.value.y,
        };

        valid.value = true;

        return;
    }

    valid.value = false;

    position.value = {
        x: event.clientX - offset.value.x,
        y: event.clientY - offset.value.y,
    };
};

const handleRelease = (event: PointerEvent) => {
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handleRelease);
    pickedUp.value = false;
    valid.value = false;

    if (checkCurrentPosition(event.target)) {
        valid.value = true;
    } else {
        position.value = { x: 0, y: 0 };
    }
};

const checkCurrentPosition = (target: EventTarget | null): boolean => {
    if (
        target instanceof HTMLElement &&
        target.classList.contains('cell') &&
        target.classList.contains('active')
    ) {
        return true;
    } else {
        return false;
    }
};
</script>

<template>
    <div
        class="module"
        :onpointerdown="handlePointerDown"
        :class="{ 'picked-up': pickedUp, valid }"
        :style="{ transform: `translate(${position.x}px, ${position.y}px)` }"
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
        background-color: rgba(255, 255, 255, 0.2);
        pointer-events: none;
    }

    &.valid {
        background-color: rgba(255, 255, 255, 0.6);
    }
}
</style>
../types/Module
