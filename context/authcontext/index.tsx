import React, { createContext, useContext, useState } from "react";

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

interface IAuthContext {
    user: IUser | undefined;
    setUser?: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

const AuthContext = createContext<IAuthContext>({ user: undefined });

export const AuthProvider: React.FC<{ user?: IUser }> = ({ children, user }) => {
    const [user_, setUser] = useState(user);
    return <AuthContext.Provider value={{ user: user_, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
