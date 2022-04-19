import React, { createContext, useContext, useState } from "react";

import { IComic, ILayer } from "./model";
import { Op, OpArgs, addLayerOp, deleteLayerOp } from "./ops";

interface IComicContext {
    comic: IComic | undefined;
    layers: ILayer[];
    newdo: (...args: any) => void;
    undo: () => void;
    redo: () => void;
}

const ComicContext = createContext<IComicContext>({
    comic: undefined,
    layers: [],
    newdo: () => {},
    undo: () => {},
    redo: () => {},
});

export const ComicProvider: React.FC<{ init_comic?: IComic }> = ({ children, init_comic }) => {
    const [comic, setComic] = useState(init_comic);
    const [layers, setLayers] = useState(comic?.layers || []);

    const [history, setHistory] = useState<Op[]>([]);
    const [pos, setPos] = useState(0);

    // add a new op
    const newdo = (type: string, args: OpArgs) => {
        let op;
        if (type === "addlayer") op = addLayerOp(args, setLayers, layers);
        if (type === "delete") op = deleteLayerOp(args, setLayers, layers);

        if (op) {
            setHistory(history.slice(0, pos).concat(op));
            history[pos].redo();
            setPos(pos + 1);
        }
    };

    // undo op
    const undo = () => {
        if (pos === 0) return;
        history[pos - 1].undo();
        setPos(pos - 1);
    };

    // redo op
    const redo = () => {
        if (pos === history.length) return;
        history[pos].redo();
        setPos(pos + 1);
    };

    return (
        <ComicContext.Provider value={{ comic, layers: comic?.layers || [], newdo, undo, redo }}>
            {children}
        </ComicContext.Provider>
    );
};

export const useComicContext = () => useContext(ComicContext);
