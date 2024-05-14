type ModuleGrid = {
    modules: ModuleGridItem[];
    shape: ModuleGridCell[][];
}

type ModuleGridCell = {
    x: number;
    y: number;
    active: boolean;
    module?: ModuleGridItem;
}

type ModuleGridItem = {
    id?: number;
    gridPosition?: { x: number; y: number };
    shape: boolean[][];
    mainCell?: { x: number; y: number };
};

type ModuleGridPickedUpValues = {
    position: { x: number; y: number };
    offset: { x: number; y: number };
    valid: boolean;
    originalPosition?: { x: number; y: number };
}

export type { ModuleGrid, ModuleGridCell, ModuleGridItem, ModuleGridPickedUpValues };