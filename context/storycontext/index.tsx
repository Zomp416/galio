import React, { createContext, useContext, useEffect, useState } from "react";
import { Op, OpArgs, editStoryOp, editChapterOp, addChapterOp, deleteChapterOp } from "./ops";
import { IChapter, IStory } from "./model";

interface IStoryContext {
    story: IStory | undefined;
    chapters: IChapter[];
    newdo: (...args: any) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    canSave: boolean;
    clearHistory?: () => void;
}

const StoryContext = createContext<IStoryContext>({
    story: undefined,
    chapters: [],
    newdo: () => {},
    undo: () => {},
    redo: () => {},
    canUndo: false,
    canRedo: false,
    canSave: false,
});

export const StoryProvider: React.FC<{ storyText?: IStory }> = ({ children, storyText }) => {
    const [story, setStory] = useState(storyText);
    const [chapters, setChapters] = useState(story?.story || []);
    const [history, setHistory] = useState<Op[]>([]);
    const [pos, setPos] = useState(0);

    //add a new op
    const newdo = (type: string, args: OpArgs) => {
        let op: Op | undefined;
        let chapter = "index" in args ? chapters[args.index] : undefined;

        if (type === "editStory") {
            op = editStoryOp(args, setStory, story!);
            if (pos > 0) {
                op = editStoryOp(args, setStory, story!);
                op.undo = history[pos - 1].undo;
                setHistory(history.slice(0, pos - 1).concat(op));
                op.redo();
            } else {
                setHistory(history.slice(0, pos).concat(op));
                op.redo();
                setPos(pos => pos + 1);
            }
            op = undefined;
        }
        if (type === "editChapter") op = editChapterOp(args, setChapters, chapter!);
        if (type === "addChapter") op = addChapterOp(args, setChapters);
        if (type == "deleteChapter") op = deleteChapterOp(args, setChapters, chapter!);

        if (op) {
            setHistory(history.slice(0, pos).concat(op));
            op.redo();
            setPos(pos => pos + 1);
        }
    };

    //undo op
    const undo = () => {
        if (pos === 0) return;
        history[pos - 1].undo();
        setPos(pos => pos - 1);
    };

    //redo op
    const redo = () => {
        if (pos === history.length) return;
        history[pos].redo();
        setPos(pos => pos + 1);
    };

    useEffect(() => {
        console.log("Chapters change: ", chapters);
    }, [chapters]);

    useEffect(() => {
        console.log("history change: ", history);
    }, [history]);

    return (
        <StoryContext.Provider
            value={{
                story,
                chapters,
                newdo,
                undo,
                redo,
                canUndo: pos !== 0,
                canRedo: pos !== history.length,
                canSave: history.length !== 0,
                clearHistory: () => {
                    setHistory([]);
                    setPos(0);
                },
            }}
        >
            {children}
        </StoryContext.Provider>
    );
};

export const useStoryContext = () => useContext(StoryContext);
