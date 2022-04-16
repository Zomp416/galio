import React, { createContext, useContext } from "react";

interface IUser {
    _id: string;
    email: string;
    username: string;
    password: string;
    about: string;
    verified: boolean;
    comics: string[];
    stories: string[];
    subscriptions: string[];
    subscriberCount: number;
    profilePicture?: string;
    comicRatings: {
        id: string;
        rating: number;
    }[];
    storyRatings: {
        id: string;
        rating: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

interface IUserContext {
    user: IUser | undefined;
}

const UserContext = createContext<IUserContext>({ user: undefined });

export const UserProvider: React.FC<{ user?: IUser }> = ({ children, user }) => {
    return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
