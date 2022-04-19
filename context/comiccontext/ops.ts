export interface Op {
    redo: () => void;
    undo: () => void;
}

// op for adding a new layer
export const addLayerOp = (args: any, setLayers: any, layers: any): Op => {
    return {
        redo: () => {
            setLayers(layers.concat(args.layer));
        },
        undo: () => {
            setLayers(layers.slice(0, -1));
        },
    };
};
