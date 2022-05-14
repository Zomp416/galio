import React, { useState } from "react";
import { useRouter } from "next/router";
import * as Styled from "./styles";
import { Typography, Button, Divider, Input } from "@mui/material";
import { useAuthContext } from "../../../context/authcontext";
import { useImageContext } from "../../../context/imagecontext";
import { useToastContext } from "../../../context/toastcontext";
import { update } from "../../../util/zileanUser";
import { createImage } from "../../../util/zilean";
import { useEditContext } from "..";

const Header: React.FC = () => {
    const router = useRouter();
    const { user } = useAuthContext();
    const { image } = useImageContext();
    const { addToast } = useToastContext();
    const { formValues, setFormValues, handleSubmit } = useEditContext();
    const [error, setError] = useState(false);

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        if (name === "profilePicture" && event.target.files!.length !== 0) {
            let formData = new FormData();
            formData.append("image", event.target.files![0]);
            formData.append("directory", "avatars");
            formData.append("name", event.target.files![0].name.split(".")[0]);
            const { data } = await createImage(formData);
            if (!data.error) {
                formValues.profilePicture = data.imageURL;
                const res = await update({ user: formValues });
                if (res.error) {
                    setError(true);
                    addToast("error", "Error in Updating Profile Picture");
                } else {
                    //There is a secondish delay before profile picture updates
                    addToast("success", "Updated Profile Picture");
                    router.push("/edit-account");
                }
            } else addToast("error", "Error in Updating Profile Picture");
        }
    };

    return (
        <>
            <Styled.ButtonsContainer>
                <Styled.CancelButton
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        router.back();
                    }}
                >
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
                <Styled.SaveButton variant="contained" color="primary" onClick={handleSubmit}>
                    Save
                </Styled.SaveButton>
            </Styled.ButtonsContainer>
            <Styled.ProfilePictureContainer>
                {user?.profilePicture === undefined ? (
                    <Styled.AddNewImage></Styled.AddNewImage>
                ) : (
                    <Styled.Image
                        src={
                            "https://zomp-media.s3.us-east-1.amazonaws.com/" + user?.profilePicture
                        }
                    ></Styled.Image>
                )}
                <label htmlFor="contained-button-file">
                    <Input
                        inputProps={{ accept: "image/*" }}
                        name="profilePicture"
                        type="file"
                        id="contained-button-file"
                        style={{ display: "none" }}
                        onChange={handleInputChange}
                    />
                    <Button variant="contained" component="span">
                        Change Profile Picture
                    </Button>
                </label>
            </Styled.ProfilePictureContainer>
            <Divider sx={{ width: "100%", marginBottom: "30px" }} />
        </>
    );
};

export default Header;
