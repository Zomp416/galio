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
            setLayers((ls: ILayer[]) => ls.concat(layer));
        },
        undo: () => {
            setLayers((ls: ILayer[]) => ls.slice(0, -1));
        },
    };
};

// op for deleteing a layer
export const deleteLayerOp = (args: OpArgs, setLayers: any, layers: any): Op => {
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
