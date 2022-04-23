type objectId = string;

interface IImageProperties {
    imageURL: objectId;
}

export interface ITextProperties {
    text: string;
    color: string;
    fontSize: string;
    fontWeight: string;
    fontStyle: string;
    textDecoration: string;
    justifyContent: string;
    alignItems: string;
}

export interface IPanelProperties {
    backgroundColor: string;
    borderStyle: string;
    borderWidth: string;
    borderColor: string;
    borderRadius: string;
}

export interface ILayer {
    type: string;
    name: string;
    visible: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    xFlip: boolean;
    yFlip: boolean;
    properties: IImageProperties | ITextProperties | IPanelProperties;
}

export interface IComic {
    title: string;
    description?: string;
    coverArt?: {
        imageURL: string;
    };
    tags: string[];
    // renderedImage: objectId;
    // author: objectId;
    layers: ILayer[];
    // views: number;
    // ratingTotal: number;
    // ratingCount: number;
    // comments: {
    //     text: string;
    //     author: objectId;
    // }[];
    // createdAt: Date;
    // updatedAt: Date;
    // publishedAt?: Date;
}
