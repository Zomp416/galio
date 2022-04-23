import { ILayer, IComic } from "./model";

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

interface ShiftLayerOpArgs {
    index: number;
    dir: "top" | "bottom" | "back" | "forward";
}

interface EditLayerOpArgs {
    index: number;
    squish?: string;
    name?: string;
    visible?: boolean;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rotation?: number;
    xFlip?: boolean;
    yFlip?: boolean;
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

interface EditComicOpArgs {
    squish?: string;
    title?: string;
    description?: string;
    coverArt?: {
        imageURL: string;
    };
    tags?: [];
}

export type OpArgs =
    | AddLayerOpArgs
    | DeleteLayerOpArgs
    | MoveLayerOpArgs
    | ResizeLayerOpArgs
    | EditLayerOpArgs
    | ShiftLayerOpArgs;

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
export const deleteLayerOp = (args: OpArgs, setLayers: any, layer: ILayer): Op => {
    const index = (args as DeleteLayerOpArgs).index;
    return {
        redo: () => {
            setLayers((ls: ILayer[]) => ls.filter((val, i) => i !== index));
        },
        undo: () => {
            setLayers((ls: ILayer[]) => ls.slice(0, index).concat(layer).concat(ls.slice(index)));
        },
    };
};

// op for deleteing a layer
export const moveLayerOp = (args: OpArgs, setLayers: any, layer: ILayer): Op => {
    const { index, x, y } = args as MoveLayerOpArgs;
    const { ...res } = layer;
    res.x = x;
    res.y = y;
    return {
        redo: () => {
            setLayers((ls: ILayer[]) => replaced(ls, index, res));
        },
        undo: () => {
            setLayers((ls: ILayer[]) => replaced(ls, index, layer));
        },
    };
};

// op for shifting a layer
export const shiftLayerOp = (args: OpArgs, setLayers: any, layers: ILayer[]): Op => {
    const { index, dir } = args as ShiftLayerOpArgs;
    const removed = layers[index];
    if (dir === "bottom") {
        return {
            redo: () => {
                setLayers((ls: ILayer[]) => {
                    const temp = ls.filter((val, i) => i !== index);
                    temp.unshift(removed);
                    return temp;
                });
            },
            undo: () => {
                setLayers((ls: ILayer[]) => {
                    const first = ls.shift();
                    if (first) {
                        return ls.slice(0, index).concat(removed).concat(ls.slice(index));
                    }
                    return ls;
                });
            },
        };
    } else if (dir === "top") {
        return {
            redo: () => {
                setLayers((ls: ILayer[]) => ls.filter((val, i) => i !== index).concat(removed));
            },
            undo: () => {
                setLayers((ls: ILayer[]) => {
                    const first = ls.pop();
                    if (first) {
                        return ls.slice(0, index).concat(removed).concat(ls.slice(index));
                    }
                    return ls;
                });
            },
        };
    } else if (dir === "back") {
        return {
            redo: () => {
                if (index !== 0) {
                    setLayers((ls: ILayer[]) => {
                        const newLayers = [...ls];
                        const temp = newLayers[index];
                        newLayers[index] = newLayers[index - 1];
                        newLayers[index - 1] = temp;
                        return newLayers;
                    });
                }
            },
            undo: () => {
                if (index !== 0) {
                    setLayers((ls: ILayer[]) => {
                        const newLayers = [...ls];
                        const temp = newLayers[index];
                        newLayers[index] = newLayers[index - 1];
                        newLayers[index - 1] = temp;
                        return newLayers;
                    });
                }
            },
        };
    } else if (dir === "forward") {
        return {
            redo: () => {
                if (index !== layers.length - 1) {
                    setLayers((ls: ILayer[]) => {
                        const newLayers = [...ls];
                        const temp = newLayers[index];
                        newLayers[index] = newLayers[index + 1];
                        newLayers[index + 1] = temp;
                        return newLayers;
                    });
                }
            },
            undo: () => {
                if (index !== layers.length - 1) {
                    setLayers((ls: ILayer[]) => {
                        const newLayers = [...ls];
                        const temp = newLayers[index];
                        newLayers[index] = newLayers[index + 1];
                        newLayers[index + 1] = temp;
                        return newLayers;
                    });
                }
            },
        };
    }
    return {
        redo: () => {},
        undo: () => {},
    };
};

// op for resizing a layer
export const resizeLayerOp = (args: OpArgs, setLayers: any, layer: ILayer): Op => {
    const { index, dw, dh, x, y } = args as ResizeLayerOpArgs;
    const { ...res } = layer;
    res.x = x;
    res.y = y;
    res.width += dw;
    res.height += dh;
    return {
        redo: () => {
            setLayers((ls: ILayer[]) => replaced(ls, index, res));
        },
        undo: () => {
            setLayers((ls: ILayer[]) => replaced(ls, index, layer));
        },
    };
};

// op for resizing a layer
export const editLayerOp = (args: OpArgs, setLayers: any, layer: ILayer): Op => {
    const { index, ...properties } = args as EditLayerOpArgs;

    const res = {
        ...layer,
        ...properties,
        properties: { ...layer.properties, ...properties },
    };

    return {
        redo: () => {
            setLayers((ls: ILayer[]) => replaced(ls, index, res));
        },
        undo: () => {
            setLayers((ls: ILayer[]) => replaced(ls, index, layer));
        },
    };
};

export const editComicOp = (args: OpArgs, setComic: any, comic: IComic): Op => {
    const comicArgs = args as EditComicOpArgs;

    return {
        redo: () => {
            setComic((c: IComic) => {
                return { ...c, ...comicArgs };
            });
        },
        undo: () => {
            setComic(comic);
        },
    };
};
