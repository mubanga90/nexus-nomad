import {
    ModuleGridItem,
    ModuleGridPickedUpValues,
} from '../../../types/ModuleGrid';

const pickUpModule = (
    event: PointerEvent,
    module: ModuleGridItem,
    allModules: ModuleGridItem[]
): { modules: ModuleGridItem[]; values: ModuleGridPickedUpValues } => {
    const moduleIndex = allModules.indexOf(module);
    const position = module.gridPosition || { x: 0, y: 0 };
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const offset = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };

    if (moduleIndex >= 0) {
        allModules.splice(moduleIndex, 1);
    }

    return {
        modules: allModules,
        values: {
            position,
            offset,
            valid: false,
            originalPosition: moduleIndex >= 0 ? position : undefined,
        },
    };
};

const moveModule = (
    event: PointerEvent,
    module: ModuleGridItem,
    values: ModuleGridPickedUpValues
): { module: ModuleGridItem; values: ModuleGridPickedUpValues } => {
    const currentPosition = checkCurrentPosition(event.target);

    if (currentPosition) {
        module.gridPosition = currentPosition as { x: number; y: number };
        values.valid = true;
        return { module, values };
    }

    values.valid = false;
    values.position = {
        x: event.clientX - values.offset.x,
        y: event.clientY - values.offset.y,
    };

    return { module, values };
};

const dropModule = (
    event: PointerEvent,
    module: ModuleGridItem,
    values: ModuleGridPickedUpValues,
    allModules: ModuleGridItem[]
): ModuleGridItem[] => {
    const currentPosition = checkCurrentPosition(event.target);

    if (currentPosition) {
        module.gridPosition = currentPosition as { x: number; y: number };
        allModules.push(module);
        return allModules;
    }

    if (values.originalPosition) {
        module.gridPosition = values.originalPosition;
        allModules.push(module);
        return allModules;
    }

    return allModules;
};

const checkCurrentPosition = (
    target: EventTarget | null
): { x: number; y: number } | boolean => {
    if (
        target instanceof HTMLElement &&
        target.classList.contains('cell') &&
        target.classList.contains('active')
    ) {
        return {
            x: parseInt(target.dataset.x!),
            y: parseInt(target.dataset.y!),
        };
    }
    return false;
};

export { pickUpModule, moveModule, dropModule };
