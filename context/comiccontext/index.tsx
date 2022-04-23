import React, { createContext, useContext, useEffect, useState } from "react";

import { IComic, ILayer } from "./model";
import {
    Op,
    OpArgs,
    addLayerOp,
    deleteLayerOp,
    moveLayerOp,
    resizeLayerOp,
    editLayerOp,
    shiftLayerOp,
    editComicOp,
} from "./ops";

interface IComicContext {
    comic: IComic | undefined;
    layers: ILayer[];
    newdo: (...args: any) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    canSave: boolean;
}

const ComicContext = createContext<IComicContext>({
    comic: undefined,
    layers: [],
    newdo: () => {},
    undo: () => {},
    redo: () => {},
    canUndo: false,
    canRedo: false,
    canSave: false,
});

export const ComicProvider: React.FC<{ init_comic?: IComic }> = ({ children, init_comic }) => {
    const [comic, setComic] = useState(init_comic);
    const [layers, setLayers] = useState(comic?.layers || []);

    const [history, setHistory] = useState<Op[]>([]);
    const [squishing, setSquishing] = useState("");
    const [pos, setPos] = useState(0);

    // add a new op
    const newdo = (type: string, args: OpArgs) => {
        let op: Op | undefined;
        let layer = "index" in args ? layers[args.index] : undefined;

        if (type === "addLayer") op = addLayerOp(args, setLayers);
        if (type === "deleteLayer") op = deleteLayerOp(args, setLayers, layer!);
        if (type === "moveLayer") op = moveLayerOp(args, setLayers, layer!);
        if (type === "resizeLayer") op = resizeLayerOp(args, setLayers, layer!);
        if (type === "shiftLayer") op = shiftLayerOp(args, setLayers, layers);

        // logic for editLayer is a lot more complicated to account for 'squishing together similar ops'
        if (type === "editLayer") {
            op = editLayerOp(args, setLayers, layer!);
            if (squishing === (args as any).squish) {
                op = editLayerOp(args, setLayers, layer!);
                op.undo = history[pos - 1].undo;
                setHistory(history.slice(0, pos - 1).concat(op));
                op.redo();
            } else {
                setHistory(history.slice(0, pos).concat(op));
                op.redo();
                setPos(pos => pos + 1);
                setSquishing((args as any).squish);
            }
            op = undefined;
        }

        if (type === "editComic") {
            op = editComicOp(args, setComic, comic!);
            if (squishing === (args as any).squish) {
                op = editComicOp(args, setComic, comic!);
                op.undo = history[pos - 1].undo;
                setHistory(history.slice(0, pos - 1).concat(op));
                op.redo();
            } else {
                setHistory(history.slice(0, pos).concat(op));
                op.redo();
                setPos(pos => pos + 1);
                setSquishing((args as any).squish);
            }
            op = undefined;
        }

        if (op) {
            setHistory(history.slice(0, pos).concat(op));
            op.redo();
            setPos(pos => pos + 1);
            setSquishing("");
        }
    };

    // undo op
    const undo = () => {
        if (pos === 0) return;
        history[pos - 1].undo();
        setPos(pos => pos - 1);
        setSquishing("");
    };

    // redo op
    const redo = () => {
        if (pos === history.length) return;
        history[pos].redo();
        setPos(pos => pos + 1);
        setSquishing("");
    };

    useEffect(() => {
        console.log("layers change: ", layers);
    }, [layers]);

    useEffect(() => {
        console.log("history change: ", history);
    }, [history]);

    return (
        <ComicContext.Provider
            value={{
                comic,
                layers,
                newdo,
                undo,
                redo,
                canUndo: pos !== 0,
                canRedo: pos !== history.length,
                canSave: history.length !== 0,
            }}
        >
            {children}
        </ComicContext.Provider>
    );
};

export const useComicContext = () => useContext(ComicContext);
