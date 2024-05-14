import { ModuleGrid, ModuleGridCell } from '../types/ModuleGrid';

const fromTextToGridshape = (text: string): boolean[][] => {
    const rows = text.split('\n');
    const gridShape = rows
        .filter((row) => row.length > 0)
        .map((row) =>
            row
                .split('')
                .filter((cell) => cell === '1' || cell === '0')
                .map((cell) => cell === '1')
        );
    return gridShape;
};

const fromGridShapeToText = (gridShape: boolean[][]): string => {
    const rows = gridShape.map((row) =>
        row.map((cell) => (cell ? '1' : '0')).join('')
    );
    const text = rows.join('\n');
    return text;
};

const fromTextToModuleGrid = (text: string): ModuleGrid => {
    const gridShape = fromTextToGridshape(text);
    const moduleGridShape = gridShape.map((row, y) =>
        row.map((cell, x) => {
            const moduleGridCell: ModuleGridCell = {
                x,
                y,
                active: cell,
            };
            return moduleGridCell;
        })
    );

    return { modules: [{ position: {x: 1, y: 3}, shape: [[true]] }], shape: moduleGridShape };
};

export { fromTextToGridshape, fromGridShapeToText, fromTextToModuleGrid };
