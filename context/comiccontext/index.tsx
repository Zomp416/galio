import React, { createContext, useContext, useState } from "react";

import { IComic, ILayer } from "./model";

interface IComicContext {
    comic: IComic | undefined;
}

const ComicContext = createContext<IComicContext>({ comic: undefined });

interface ILayerContext {
    layers: ILayer[];
    op: (...args: any) => void;
    undo: () => void;
    redo: () => void;
}

interface Transaction {
    redo: () => void;
    undo: () => void;
}

const LayerContext = createContext<ILayerContext>({
    layers: [],
    op: () => {},
    undo: () => {},
    redo: () => {},
});

export const ComicProvider: React.FC<{ init_comic?: IComic }> = ({ children, init_comic }) => {
    const [comic, setComic] = useState(init_comic);
    const [layers, setLayers] = useState(comic?.layers || []);

    const [history, setHistory] = useState<Transaction[]>([]);
    const [pos, setPos] = useState(0);

    const op = (type: string, ...args: any) => {
        if (type === "newlayer") {
            const newOp: Transaction = {
                redo: () => {
                    setLayers(layers.concat(args.layer));
                },
                undo: () => {
                    setLayers(layers.slice(0, -1));
                },
            };
            setHistory(history.slice(0, pos).concat(newOp));
            setPos(pos + 1);
        }
    };
    const undo = () => {
        if (pos === 0) return;
        history[pos].undo();
        setPos(pos - 1);
    };
    const redo = () => {
        if (pos === history.length) return;
        history[pos].redo();
        setPos(pos + 1);
    };

    return (
        <ComicContext.Provider value={{ comic }}>
            <LayerContext.Provider value={{ layers: comic?.layers || [], op, undo, redo }}>
                {children}
            </LayerContext.Provider>
        </ComicContext.Provider>
    );
};

export const useComicContext = () => useContext(ComicContext);
