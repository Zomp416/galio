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

export type OpArgs = AddLayerOpArgs | DeleteLayerOpArgs;

// op for adding a new layer
export const addLayerOp = (args: OpArgs, setLayers: any, layers: any): Op => {
    const layer = (args as AddLayerOpArgs).layer;
    return {
        redo: () => {
            setLayers(layers.concat(layer));
        },
        undo: () => {
            setLayers(layers.slice(0, -1));
        },
    };
};

// op for deleteing a layer
export const deleteLayerOp = (args: OpArgs, setLayers: any, layers: any): Op => {
    const index = (args as DeleteLayerOpArgs).index;
    const removed = layers[index];
    return {
        redo: () => {
            setLayers(layers.slice(0, index).concat(layers.slice(index + 1)));
        },
        undo: () => {
            setLayers(layers.slice(0, index).concat(removed).concat(layers.slice(index)));
        },
    };
};
