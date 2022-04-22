import React, { createContext, useContext } from "react";

interface IImage {
    _id: string;
    name: string;
    imageURL: string;
    tags: string[];
    searchable: boolean;
    author?: string;
}

interface IImageContext {
    image: IImage | undefined;
}

const ImageContext = createContext<IImageContext>({ image: undefined });

export const ImageProvider: React.FC<{ image?: IImage }> = ({ children, image }) => {
    return <ImageContext.Provider value={{ image }}>{children}</ImageContext.Provider>;
};

export const useImageContext = () => useContext(ImageContext);
