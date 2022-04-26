import React, { useState } from "react";
import { Divider, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import * as Styled from "./styles";

const Chapter: React.FC<{ story?: any }> = ({ story }) => {
    const [chapter, setChapter] = useState(0);
    return (
        <Styled.Story>
            <Styled.ButtonsContainer>
                {chapter - 1 >= 0 ? (
                    <Styled.ChapterButton
                        variant="contained"
                        onClick={() => setChapter(chapter - 1)}
                    >
                        <ChevronLeftIcon />
                        {story[chapter - 1].chapterName}
                    </Styled.ChapterButton>
                ) : (
                    <div></div>
                )}
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {story[chapter].chapterName}
                </Typography>
                {chapter + 1 < story.length ? (
                    <Styled.ChapterButton
                        variant="contained"
                        onClick={() => setChapter(chapter + 1)}
                    >
                        {story[chapter + 1].chapterName}
                        <ChevronRightIcon />
                    </Styled.ChapterButton>
                ) : (
                    <div></div>
                )}
            </Styled.ButtonsContainer>
            <Typography> {story[chapter].text} </Typography>

            <Divider
                sx={{
                    marginTop: "15px",
                }}
            />
        </Styled.Story>
    );
};

export default Chapter;
