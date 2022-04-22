import { ILayer } from "./model";

export interface Op {
    redo: () => void;
    undo: () => void;
}

interface AddLayerOpArgs {
    layer: ILayer;
}

interface DeleteLayerOpArgs {
    index: number;
}

interface MoveLayerOpArgs {
    index: number;
    x: number;
    y: number;
}

interface ResizeLayerOpArgs {
    index: number;
    dw: number;
    dh: number;
    x: number;
    y: number;
}

export type OpArgs = AddLayerOpArgs | DeleteLayerOpArgs | MoveLayerOpArgs | ResizeLayerOpArgs;

const replaced = (layers: ILayer[], index: number, replacement: ILayer) => {
    return layers
        .slice(0, index)
        .concat(replacement)
        .concat(layers.slice(index + 1));
};

// op for adding a new layer
export const addLayerOp = (args: OpArgs, setLayers: any): Op => {
    const layer = (args as AddLayerOpArgs).layer;
    return {
        redo: () => {
            setLayers((ls: ILayer[]) => ls.concat(layer));
        },
        undo: () => {
            setLayers((ls: ILayer[]) => ls.slice(0, -1));
        },
    };
};

// op for deleting a layer
export const deleteLayerOp = (args: OpArgs, setLayers: any, layers: ILayer[]): Op => {
    const index = (args as DeleteLayerOpArgs).index;
    const removed = layers[index];
    return {
        redo: () => {
            setLayers((ls: ILayer[]) => ls.slice(0, index).concat(ls.slice(index + 1)));
        },
        undo: () => {
            setLayers((ls: ILayer[]) => ls.slice(0, index).concat(removed).concat(ls.slice(index)));
        },
    };
};

// op for deleteing a layer
export const moveLayerOp = (args: OpArgs, setLayers: any, layers: any): Op => {
    const { index, x, y } = args as MoveLayerOpArgs;
    const { ...res } = layers[index];
    res.x = x;
    res.y = y;
    return {
        redo: () => {
            setLayers((ls: ILayer[]) => replaced(ls, index, res));
        },
        undo: () => {
            setLayers((ls: ILayer[]) => replaced(ls, index, layers[index]));
        },
    };
};

// op for resizing a layer
export const resizeLayerOp = (args: OpArgs, setLayers: any, layers: any): Op => {
    const { index, dw, dh, x, y } = args as ResizeLayerOpArgs;
    const { ...res } = layers[index];
    res.x = x;
    res.y = y;
    res.width += dw;
    res.height += dh;
    return {
        redo: () => {
            setLayers((ls: ILayer[]) => replaced(ls, index, res));
        },
        undo: () => {
            setLayers((ls: ILayer[]) => replaced(ls, index, layers[index]));
        },
    };
};
