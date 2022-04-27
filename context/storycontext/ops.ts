import { IStory, IChapter } from "./model";

export interface Op {
    redo: () => void;
    undo: () => void;
}

interface AddChapterOpArgs {
    story: IChapter;
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
