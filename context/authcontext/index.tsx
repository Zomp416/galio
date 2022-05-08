import React, { createContext, useContext } from "react";

export interface IUser {
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

interface IAuthContext {
    user: IUser | undefined;
}

const AuthContext = createContext<IAuthContext>({ user: undefined });

export const AuthProvider: React.FC<{ user?: IUser }> = ({ children, user }) => {
    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
