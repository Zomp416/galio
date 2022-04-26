import React, { createContext, useContext, useEffect, useState } from "react";

import { IStory } from "./model";

interface IStoryContext {
    story: IStory | undefined;
}

const StoryContext = createContext<IStoryContext>({ story: undefined });

export const StoryProvider: React.FC<{ story?: IStory }> = ({ children, story }) => {
    return <StoryContext.Provider value={{ story }}>{children}</StoryContext.Provider>;
};

export const useStoryContext = () => useContext(StoryContext);
