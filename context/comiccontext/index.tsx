import React, { createContext, useContext } from "react";

import { IComic } from "./model";

interface IComicContext {
    comic: IComic | undefined;
}

const ComicContext = createContext<IComicContext>({ comic: undefined });

export const ComicProvider: React.FC<{ comic?: IComic }> = ({ children, comic }) => {
    return <ComicContext.Provider value={{ comic }}>{children}</ComicContext.Provider>;
};

export const useComicContext = () => useContext(ComicContext);
