import React, { createContext, useContext, useState } from "react";
import { Typography } from "@mui/material";
import { createStory } from "../../../util/zileanStory";
import { useRouter } from "next/router";
import * as Styled from "./styles";
import EditTable from "./edittable";
import PublishTable from "./publishtable";
import AddIcon from "@mui/icons-material/Add";

interface StoryProps {
    published: any[];
    unpublished: any[];
}

interface ISelectionContext {
    selection: number;
    setSelection?: React.Dispatch<React.SetStateAction<number>>;
}

const SelectionContext = createContext<ISelectionContext>({ selection: -1 });

const MyStories: React.FC<StoryProps> = props => {
    const [filter, setFilter] = useState("edit");
    const [selection, setSelection] = useState(-1);
    const router = useRouter();

    const onSetFilter = (e: any) => {
        if (filter !== e.target.value) setSelection(-1);
        setFilter(e.target.value);
    };

    //Used to create stories
    const handleCreateStory = async () => {
        //event.preventDefault(); having event prevents it from being a input in onclick
        const data = await createStory();
        if (!data.error) {
            router.push({ pathname: "/story/edit/" + data.data._id });
        }
    };

    return (
        <SelectionContext.Provider value={{ selection, setSelection }}>
            <Styled.MyStoriesOuter className="outer">
                <Styled.MyStoriesInner className="inner">
                    <Styled.MyStoriesHeader>
                        <Typography variant="h4">My Stories</Typography>
                        <Styled.ToggleButtonGroup
                            color="primary"
                            value={filter}
                            exclusive
                            onChange={onSetFilter}
                        >
                            <Styled.ToggleButton value="edit">Editing</Styled.ToggleButton>
                            <Styled.ToggleButton value="publish">Published</Styled.ToggleButton>
                        </Styled.ToggleButtonGroup>
                        <Styled.EditButton onClick={handleCreateStory}>
                            <Typography>New Story</Typography>
                            <AddIcon />
                        </Styled.EditButton>
                    </Styled.MyStoriesHeader>
                    {filter === "edit" ? (
                        <EditTable stories={props.unpublished} />
                    ) : (
                        <PublishTable stories={props.published} />
                    )}
                </Styled.MyStoriesInner>
            </Styled.MyStoriesOuter>
        </SelectionContext.Provider>
    );
};

export const useSelectionContext = () => useContext(SelectionContext);
export default MyStories;
