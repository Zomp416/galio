// import { ILayer, IComic } from "./model";

export interface Op {
    redo: () => void;
    undo: () => void;
}
