import React, { useState } from "react";
import { MenuItem, Typography } from "@mui/material";

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
            <Styled.FloatLeft className="floatLeft">
                <div>
                    <Typography variant="h6" width={"100%"}>
                        Other Comics:
                    </Typography>
                </div>
            </Styled.FloatLeft>
            <Styled.FloatRight className="floatRight">
                <Styled.Select
                    variant="standard"
                    value={publishSelector}
                    onChange={handleChangePublish}
                >
                    <MenuItem value="Published">Published</MenuItem>
                    <MenuItem value="Unpublished">Unpulished</MenuItem>
                    <MenuItem value="Both">Both</MenuItem>
                </Styled.Select>
                <Styled.Select
                    variant={"standard"}
                    value={sortSelector}
                    onChange={handleChangeSort}
                >
                    <MenuItem value="Popular">Popular</MenuItem>
                    <MenuItem value="Recent">Recent</MenuItem>
                    <MenuItem value="A-Z">A-Z</MenuItem>
                    <MenuItem value="Z-A">Z-A</MenuItem>
                </Styled.Select>
            </Styled.FloatRight>
        </Styled.GridOptions>
    );
};

export default GridOptions;
