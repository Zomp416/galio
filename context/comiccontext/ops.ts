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
    dx: number;
    dy: number;
}

export type OpArgs = AddLayerOpArgs | DeleteLayerOpArgs | MoveLayerOpArgs;

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

// op for deleteing a layer
export const moveLayerOp = (args: OpArgs, setLayers: any, layers: any): Op => {
    const { index, dx, dy } = args as MoveLayerOpArgs;
    const { ...removed } = layers[index];
    removed.x += dx;
    removed.y += dy;
    return {
        redo: () => {
            setLayers((ls: ILayer[]) =>
                ls
                    .slice(0, index)
                    .concat(removed)
                    .concat(ls.slice(index + 1))
            );
        },
        undo: () => {
            setLayers((ls: ILayer[]) =>
                ls
                    .slice(0, index)
                    .concat(layers[index])
                    .concat(ls.slice(index + 1))
            );
        },
    };
};
