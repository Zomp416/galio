import { IStory, IChapter } from "./model";

export interface Op {
    redo: () => void;
    undo: () => void;
}

interface AddChapterOpArgs {
    chapter: IChapter;
}

interface DeleteChapterOpArgs {
    index: number;
}

interface EditChapterOpArgs {
    index: number;
    chapterName?: string;
    text: string;
}

interface EditStoryOpArgs {
    title?: string;
    description?: string;
    coverArt?: {
        imageURL: string;
    };
    tags?: [];
}

export type OpArgs = AddChapterOpArgs | DeleteChapterOpArgs | EditChapterOpArgs;

const replaced = (chapters: IChapter[], index: number, replacement: IChapter) => {
    return chapters
        .slice(0, index)
        .concat(replacement)
        .concat(chapters.slice(index + 1));
};

// op for adding a new chapter
export const addChapterOp = (args: OpArgs, setChapters: any): Op => {
    const chapter = (args as AddChapterOpArgs).chapter;
    return {
        redo: () => {
            setChapters((cs: IChapter[]) => cs.concat(chapter));
        },
        undo: () => {
            setChapters((cs: IChapter[]) => cs.slice(0, -1));
        },
    };
};

// op for deleting a chapter
export const deleteChapterOp = (args: OpArgs, setChapters: any, chapter: IChapter): Op => {
    const index = (args as DeleteChapterOpArgs).index;

    return {
        redo: () => {
            setChapters((cs: IChapter[]) => cs.filter((val, i) => i !== index));
        },
        undo: () => {
            setChapters((cs: IChapter[]) =>
                cs.slice(0, index).concat(chapter).concat(cs.slice(index))
            );
        },
    };
};

// op for editing chapter
export const editChapterOp = (args: OpArgs, setChapters: any, chapter: IChapter): Op => {
    const { index, chapterName, text } = args as EditChapterOpArgs;
    const { ...res } = chapter;
    res.chapterName = chapterName!;
    res.text = text;
    return {
        redo: () => {
            setChapters((cs: IChapter[]) => replaced(cs, index, res));
        },
        undo: () => {
            setChapters((cs: IChapter[]) => replaced(cs, index, chapter));
        },
    };
};

export const editStoryOp = (args: OpArgs, setStory: any, story: IStory): Op => {
    const storyArgs = args as EditStoryOpArgs;

    return {
        redo: () => {
            setStory((s: IStory) => {
                return { ...s, ...storyArgs };
            });
        },
        undo: () => {
            setStory(story);
        },
    };
};
