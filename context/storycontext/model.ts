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

export interface IStory {
    _id: string;
    title: string;
    description?: string;
    tags: string[];
    story: string[];
    author: objectId;
    views: number;
    ratingTotal: number;
    ratingCount: number;
    comments: {
        text: string;
        author: objectId;
    }[];
    coverart?: objectId;
    updatedAt: Date;
    createdAt: Date;
    publishedAt?: Date;
}
