import React, { createContext, useContext, useState } from "react";
import { Typography } from "@mui/material";

import { useRouter } from "next/router";
import * as Styled from "./styles";
import EditTable from "./edittable";
import PublishTable from "./publishtable";
import AddIcon from "@mui/icons-material/Add";
import { createComic } from "../../../util/zileanComic";

interface ComicProps {
    published: any[];
    unpublished: any[];
}

interface ISelectionContext {
    selection: number;
    setSelection?: React.Dispatch<React.SetStateAction<number>>;
}

const SelectionContext = createContext<ISelectionContext>({ selection: -1 });

const MyComics: React.FC<ComicProps> = props => {
    const router = useRouter();

    const [filter, setFilter] = useState("edit");
    const [selection, setSelection] = useState(-1);

    const onSetFilter = (e: any) => {
        if (filter !== e.target.value) setSelection(-1);
        setFilter(e.target.value);
    };

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = await createComic();
        if (!data.error) {
            router.push({ pathname: "/comic/edit/" + data.data._id });
        }
    };

    return (
        <SelectionContext.Provider value={{ selection, setSelection }}>
            <Styled.MyComicsOuter className="outer">
                <Styled.MyComicsInner className="inner">
                    <Styled.MyComicsHeader>
                        <Typography variant="h4">My Comics</Typography>
                        <Styled.ToggleButtonGroup
                            color="primary"
                            value={filter}
                            exclusive
                            onChange={onSetFilter}
                        >
                            <Styled.ToggleButton value="edit">Editing</Styled.ToggleButton>
                            <Styled.ToggleButton value="publish">Published</Styled.ToggleButton>
                        </Styled.ToggleButtonGroup>
                        <Styled.EditButton
                            onClick={e => {
                                handleCreate(e);
                            }}
                        >
                            <Typography>New Comic</Typography>
                            <AddIcon />
                        </Styled.EditButton>
                    </Styled.MyComicsHeader>
                    {filter === "edit" ? (
                        <EditTable comics={props.unpublished} />
                    ) : (
                        <PublishTable comics={props.published} />
                    )}
                </Styled.MyComicsInner>
            </Styled.MyComicsOuter>
        </SelectionContext.Provider>
    );
};

export const useSelectionContext = () => useContext(SelectionContext);
export default MyComics;
