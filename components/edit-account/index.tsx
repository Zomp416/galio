import React, { useState } from "react";
// import Link from "next/link";
import * as Styled from "./styles";
import Form from "./form";
import { Typography, Divider } from "@mui/material";

const EditAccount: React.FC = () => {
    return (
        <Styled.EditAccountContainer>
            <Styled.ButtonsContainer>
                {/* TODO import router to go back to previous page */}
                <Styled.CancelButton variant="contained" color="primary">
                    Cancel
                </Styled.CancelButton>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        fontSize: "35px",
                        color: "black",
                    }}
                >
                    Account Settings
                </Typography>
                {/* TODO save information*/}
                <Styled.SaveButton variant="contained" color="primary">
                    Save
                </Styled.SaveButton>
            </Styled.ButtonsContainer>
            <Styled.ProfilePictureContainer>
                <Styled.AddNewImage></Styled.AddNewImage>
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: "17px",
                        color: "black",
                    }}
                >
                    Change Profile Picture
                </Typography>
            </Styled.ProfilePictureContainer>
            <Divider sx={{ width: "100%", marginBottom: "30px" }} />
            <Form></Form>
        </Styled.EditAccountContainer>
    );
};

export default EditAccount;
