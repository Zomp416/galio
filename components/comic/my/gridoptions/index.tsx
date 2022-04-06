import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import * as Styled from "./styles";

const GridOptions: React.FC = () => {
    const [publishSelector, setPublishSelector] = useState("Published");
    const [sortSelector, setSortSelector] = useState("Popular");

    const handleChangePublish = (e: any) => {
        setPublishSelector(e.target.value);
    };

    const handleChangeSort = (e: any) => {
        if (e.target.value == "Popular") setPublishSelector("Published");
        setSortSelector(e.target.value);
    };

    return (
        <Styled.GridOptions className="gridoptions">
            <Select value={publishSelector} onChange={handleChangePublish}>
                <MenuItem value="Published">Published</MenuItem>
                <MenuItem value="Unpublished">Unpulished</MenuItem>
                <MenuItem value="Both">Both</MenuItem>
            </Select>
            <Select value={sortSelector} onChange={handleChangeSort}>
                <MenuItem value="Popular">Popular</MenuItem>
                <MenuItem value="Recently Edited">Recent</MenuItem>
            </Select>
        </Styled.GridOptions>
    );
};

export default GridOptions;
