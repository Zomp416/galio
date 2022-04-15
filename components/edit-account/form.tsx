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
import { useAuthContext } from "../../context/authcontext";
import { update } from "../../util/zilean";
import { deleteAccount } from "../../util/zilean";

//TODO import default values from context
const Form: React.FC = () => {
    const router = useRouter();
    const { user } = useAuthContext();
    const defaultValues = {
        email: user?.email!,
        username: user?.username!,
        oldpassword: "",
        newpassword: "",
        confirmpassword: "",
        about: user?.about!,
        password: user?.password!,
    };
    const [formValues, setFormValues] = useState(defaultValues);
    const [error, setError] = useState(false);
    const [modalPasswordOpen, setModalPasswordOpen] = useState<boolean>(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = await update({ user: formValues });
        if (data.error) {
            setError(true);
        } else {
            router.back();
        }
    };

    const handleDelete = async (event: React.FormEvent) => {
        setModalDeleteOpen(false);
        event.preventDefault();
        const data = await deleteAccount();
        if (data.error) {
            setError(true);
        } else {
            router.push("/");
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
                <Styled.AddNewImage></Styled.AddNewImage>
                {/* {formValues.profilePicture === "" ? (
                    <Styled.AddNewImage></Styled.AddNewImage>
                ) : (
                    <Styled.Image src={formValues.profilePicture}></Styled.Image>
                )} */}
                <label htmlFor="contained-button-file">
                    {/* <Input
                        inputProps={{ accept: "image/*" }}
                        name="profilePicture"
                        type="file"
                        id="contained-button-file"
                        style={{ display: "none" }}
                        onChange={handleInputChange}
                        value={formValues.profilePicture}
                    /> */}
                    <Button variant="contained" component="span">
                        Change Profile Picture
                    </Button>
                </label>
            </Styled.ProfilePictureContainer>
            <Divider sx={{ width: "100%", marginBottom: "30px" }} />
            <Dialog
                open={modalPasswordOpen}
                onClose={(_, reason) => {
                    setModalPasswordOpen(false);
                    if (reason === "backdropClick") {
                        formValues.oldpassword = "";
                        formValues.newpassword = "";
                        formValues.confirmpassword = "";
                    }
                }}
                fullWidth
                PaperProps={{
                    style: {
                        backgroundColor: "#E6F4F1",
                    },
                }}
            >
                <Styled.DialogContainer>
                    <DialogTitle>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "bold",
                                fontSize: "25px",
                                color: "black",
                                marginBottom: "10px",
                            }}
                        >
                            Change Password
                        </Typography>
                    </DialogTitle>
                    <TextField
                        required
                        id="oldpassword"
                        name="oldpassword"
                        label="Old Password"
                        type="oldpasword"
                        variant="outlined"
                        value={formValues.oldpassword}
                        onChange={handleInputChange}
                        error={error}
                        style={{ width: 500, marginBottom: 30, marginLeft: 20 }}
                    />
                    <TextField
                        required
                        id="newpassword"
                        name="newpassword"
                        label="New Password"
                        type="newpassword"
                        variant="outlined"
                        value={formValues.newpassword}
                        onChange={handleInputChange}
                        error={error}
                        style={{ width: 500, marginBottom: 30, marginLeft: 20 }}
                    />
                    <TextField
                        required
                        id="confirmpassword"
                        name="confirmpassword"
                        label="Confirm New Password"
                        type="confirmpassword"
                        variant="outlined"
                        value={formValues.confirmpassword}
                        onChange={handleInputChange}
                        error={error}
                        style={{ width: 500, marginBottom: 30, marginLeft: 20 }}
                    />
                    <DialogActions>
                        <Button
                            onClick={() => {
                                setModalPasswordOpen(false);
                            }}
                        >
                            Done
                        </Button>
                        <Button
                            onClick={() => {
                                setModalPasswordOpen(false);
                                formValues.oldpassword = "";
                                formValues.newpassword = "";
                                formValues.confirmpassword = "";
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Styled.DialogContainer>
            </Dialog>
            <Dialog
                open={modalDeleteOpen}
                onClose={() => {
                    setModalDeleteOpen(false);
                }}
                fullWidth
                PaperProps={{
                    style: {
                        backgroundColor: "#E6F4F1",
                    },
                }}
            >
                <Styled.DialogContainer>
                    <DialogTitle>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "bold",
                                fontSize: "25px",
                                color: "black",
                                marginBottom: "10px",
                            }}
                        >
                            Are you sure you want to delete your account?
                        </Typography>
                        <Typography
                            variant="h4"
                            justifyItems={"center"}
                            sx={{
                                fontWeight: "bold",
                                fontSize: "25px",
                                color: "red",
                                marginBottom: "10px",
                            }}
                        >
                            All of your saved data will be lost!
                        </Typography>
                    </DialogTitle>
                    <DialogActions>
                        <Styled.YesNoButtonContainer>
                            <Styled.YesButton variant="contained" href="/" onClick={handleDelete}>
                                Yes
                            </Styled.YesButton>
                            <Styled.CancelButton
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    setModalDeleteOpen(false);
                                }}
                            >
                                No
                            </Styled.CancelButton>
                        </Styled.YesNoButtonContainer>
                    </DialogActions>
                </Styled.DialogContainer>
            </Dialog>
            <TextField
                id="username"
                name="username"
                label="Username"
                type="username"
                variant="outlined"
                value={formValues.username}
                onChange={handleInputChange}
                error={error}
                style={{ width: 600, marginBottom: 30 }}
            />
            <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                value={formValues.email}
                onChange={handleInputChange}
                error={error}
                style={{ width: 600, marginBottom: 40 }}
            />
            <Styled.PasswordContainer>
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: "17px",
                        color: "gray",
                        marginRight: "20px",
                    }}
                >
                    Password:
                </Typography>
                <Button
                    variant="contained"
                    component="span"
                    onClick={() => {
                        setModalPasswordOpen(true);
                    }}
                >
                    Change Password
                </Button>
            </Styled.PasswordContainer>
            <TextField
                id="about"
                name="about"
                label="About"
                type="about"
                multiline
                rows={6}
                variant="outlined"
                value={formValues.about}
                onChange={handleInputChange}
                error={error}
                style={{ width: 600, marginBottom: 40 }}
            />
            <div style={{ marginBottom: "20px" }}>
                {error && (
                    <Typography color="error" variant="h5">
                        Invalid Form Values
                    </Typography>
                )}{" "}
            </div>
            <Styled.DeleteAccountButton
                variant="contained"
                onClick={() => {
                    setModalDeleteOpen(true);
                }}
            >
                Delete Account
            </Styled.DeleteAccountButton>
        </>
    );
};

export default Form;
