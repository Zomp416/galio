import React, { createContext, useContext, useState } from "react";

interface ISearchContext {
    tags: string[];
    newTag: string;
    modalOpen: boolean;
    category: string;
    time: string;
    sort: string;
    page: number;
    results: any[];
    setTags: (__: string[]) => void;
    setNewTag: (__: string) => void;
    setModalOpen: (__: boolean) => void;
    setCategory: (__: string) => void;
    setTime: (__: string) => void;
    setSort: (__: string) => void;
    setPage: (__: number) => void;
    setResults: (__: any[]) => void;
}

const SearchContext = createContext<ISearchContext>({
    tags: [],
    newTag: "",
    modalOpen: false,
    category: "Comics",
    time: "Today",
    sort: "alpha",
    page: 0,
    results: [],
    setTags: (__: string[]) => {},
    setNewTag: (__: string) => {},
    setModalOpen: (__: boolean) => {},
    setCategory: (__: string) => {},
    setTime: (__: string) => {},
    setSort: (__: string) => {},
    setPage: (__: number) => {},
    setResults: (__: any[]) => {},
});

export const SearchProvider: React.FC = ({ children }) => {
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [category, setCategory] = useState<string>("Comics");
    const [time, setTime] = useState<string>("Today");
    const [sort, setSort] = useState<string>("alpha");
    const [page, setPage] = useState(0);
    const [results, setResults] = useState<any[]>([]);
    return (
        <SearchContext.Provider
            value={{
                tags,
                newTag,
                modalOpen,
                category,
                time,
                sort,
                page,
                results,
                setTags,
                setNewTag,
                setModalOpen,
                setCategory,
                setTime,
                setSort,
                setPage,
                setResults,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => useContext(SearchContext);
