import React, { createContext, useContext, useState } from "react";

interface ISearchContext {
    queryText: string;
    tags: string[];
    newTag: string;
    modalOpen: boolean;
    category: string;
    time: string;
    sort: string;
    page: number;
    results: any[];
    total: number;
    setQueryText: (__: string) => void;
    setTags: (__: string[]) => void;
    setNewTag: (__: string) => void;
    setModalOpen: (__: boolean) => void;
    setCategory: (__: string) => void;
    setTime: (__: string) => void;
    setSort: (__: string) => void;
    setPage: (__: number) => void;
    setResults: (__: any[]) => void;
    setTotal: (__: number) => void;
}

const SearchContext = createContext<ISearchContext>({
    queryText: "",
    tags: [],
    newTag: "",
    modalOpen: false,
    category: "Comics",
    time: "Today",
    sort: "alpha",
    page: 0,
    results: [],
    total: 0,
    setQueryText: (__: string) => {},
    setTags: (__: string[]) => {},
    setNewTag: (__: string) => {},
    setModalOpen: (__: boolean) => {},
    setCategory: (__: string) => {},
    setTime: (__: string) => {},
    setSort: (__: string) => {},
    setPage: (__: number) => {},
    setResults: (__: any[]) => {},
    setTotal: (__: number) => {},
});

export const SearchProvider: React.FC = ({ children }) => {
    const [queryText, setQueryText] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [category, setCategory] = useState<string>("comic");
    const [time, setTime] = useState<string>("day");
    const [sort, setSort] = useState<string>("alpha");
    const [page, setPage] = useState(0);
    const [results, setResults] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    return (
        <SearchContext.Provider
            value={{
                queryText,
                tags,
                newTag,
                modalOpen,
                category,
                time,
                sort,
                page,
                results,
                total,
                setQueryText,
                setTags,
                setNewTag,
                setModalOpen,
                setCategory,
                setTime,
                setSort,
                setPage,
                setResults,
                setTotal,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => useContext(SearchContext);
