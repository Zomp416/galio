import React, { createContext, useContext, useState } from "react";

interface IHubContext {
    category: string;
    time: string;
    sort: string;
    featured: any[];
    others: any[];
    setTime: (__: string) => void;
    setSort: (__: string) => void;
    setFeatured: (__: any[]) => void;
    setOthers: (__: any[]) => void;
}

const HubContext = createContext<IHubContext>({
    category: "Comics",
    time: "Today",
    sort: "alpha",
    featured: [],
    others: [],
    setTime: (__: string) => {},
    setSort: (__: string) => {},
    setFeatured: (__: any[]) => {},
    setOthers: (__: any[]) => {},
});

interface Props {
    category: string;
}

export const HubProvider: React.FC<Props> = ({ children, category }) => {
    const [time, setTime] = useState<string>("day");
    const [sort, setSort] = useState<string>("alpha");
    const [featured, setFeatured] = useState<any[]>([]);
    const [others, setOthers] = useState<any[]>([]);
    return (
        <HubContext.Provider
            value={{
                category,
                time,
                sort,
                featured,
                others,
                setTime,
                setSort,
                setFeatured,
                setOthers,
            }}
        >
            {children}
        </HubContext.Provider>
    );
};

export const useHubContext = () => useContext(HubContext);
