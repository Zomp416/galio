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

interface EditLayerOpArgs {
    index: number;
    text?: string;
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    fontStyle?: string;
    textDecoration?: string;
    backgroundColor?: string;
    borderStyle?: string;
    borderWidth?: string;
    borderColor?: string;
    borderRadius?: string;
}

export type OpArgs =
    | AddLayerOpArgs
    | DeleteLayerOpArgs
    | MoveLayerOpArgs
    | ResizeLayerOpArgs
    | EditLayerOpArgs;

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
            setLayers((ls: ILayer[]) => ls.filter((val, i) => i !== index));
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

// op for resizing a layer
export const editLayerOp = (args: OpArgs, setLayers: any, layers: any): Op => {
    const { index, ...style } = args as EditLayerOpArgs;
    const { ...res } = layers[index];
    const { ...properties } = res.properties;

    // maybe there is a better way to do this
    if (style.text) properties.text = style.text;
    if (style.color) properties.color = style.color;
    if (style.fontSize) properties.fontSize = style.fontSize;
    if (style.fontWeight) properties.fontWeight = style.fontWeight;
    if (style.fontStyle) properties.fontStyle = style.fontStyle;
    if (style.textDecoration) properties.textDecoration = style.textDecoration;
    if (style.backgroundColor) properties.backgroundColor = style.backgroundColor;
    if (style.borderStyle) properties.borderStyle = style.borderStyle;
    if (style.borderWidth) properties.borderWidth = style.borderWidth;
    if (style.borderColor) properties.borderColor = style.borderColor;
    if (style.borderRadius) properties.borderRadius = style.borderRadius;

    res.properties = properties;

    return {
        redo: () => {
            setLayers((ls: ILayer[]) => replaced(ls, index, res));
        },
        undo: () => {
            setLayers((ls: ILayer[]) => replaced(ls, index, layers[index]));
        },
    };
};
