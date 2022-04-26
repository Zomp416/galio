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
