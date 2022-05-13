import React, { useState } from "react";
import { useRouter } from "next/router";
import * as Styled from "./styles";
import {
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    Divider,
    Input,
} from "@mui/material";
import { useAuthContext } from "../../../context/authcontext";
import { useImageContext } from "../../../context/imagecontext";
import { update } from "../../../util/zileanUser";
import { createImage } from "../../../util/zilean";
import { useEditContext } from "..";

const Header: React.FC = () => {
    const router = useRouter();
    const { user } = useAuthContext();
    const { image } = useImageContext();
    const { formValues, setFormValues, handleSubmit } = useEditContext();

    // const defaultValues = {
    //     email: user?.email!,
    //     username: user?.username!,
    //     oldpassword: "",
    //     newpassword: "",
    //     confirmpassword: "",
    //     about: user?.about!,
    //     password: user?.password!,
    //     profilePicture: image?.imageURL,
    // };
    // const [formValues, setFormValues] = useState(defaultValues);
    const [error, setError] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [finalImage, setFinalImage] = useState<File>();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // const { name, value } = event.target;
        // if (name === "profilePicture" && event.target.files!.length !== 0) {
        //     setImagePreview(URL.createObjectURL(event.target.files![0]));
        //     setFinalImage(event.target.files![0]);
        // } else {
        //     setFormValues({
        //         ...formValues,
        //         [name]: value,
        //     });
        // }
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
                {finalImage === undefined ? (
                    image === null ? (
                        <Styled.AddNewImage></Styled.AddNewImage>
                    ) : (
                        <Styled.Image
                            src={"https://zomp-media.s3.us-east-1.amazonaws.com/" + image}
                        ></Styled.Image>
                    )
                ) : (
                    <Styled.Image src={imagePreview}></Styled.Image>
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
