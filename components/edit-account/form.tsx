import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import * as Styled from "./styles";
import { TextField, Typography, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

//TODO import default values from context
const defaultValues = {
    name: "",
    username: "",
    oldpassword: "",
    newpassword: "",
    email: "",
    about: "",
};

const Form: React.FC = () => {
    const router = useRouter();
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
        console.log(formValues);
    };

    return (
        <>
            <Dialog
                open={modalPasswordOpen}
                onClose={() => {
                    setModalPasswordOpen(false);
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
                        id="oldpasword"
                        name="oldpasword"
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
                        id="newpasword"
                        name="newpasword"
                        label="New Password"
                        type="newpasword"
                        variant="outlined"
                        value={formValues.newpassword}
                        onChange={handleInputChange}
                        error={error}
                        style={{ width: 500, marginBottom: 30, marginLeft: 20 }}
                    />
                    <TextField
                        required
                        id="confirmnewpasword"
                        name="confirmnewpasword"
                        label="Confirm New Password"
                        type="confirmnewpasword"
                        variant="outlined"
                        value={formValues.newpassword}
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
                            <Styled.YesButton
                                variant="contained"
                                onClick={() => {
                                    setModalDeleteOpen(false);
                                }}
                            >
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
                id="name"
                name="name"
                label="Name"
                type="name"
                variant="outlined"
                value={formValues.name}
                onChange={handleInputChange}
                error={error}
                style={{ width: 600, marginBottom: 30 }}
            />
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
                <Styled.ChangePasswordButton
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setModalPasswordOpen(true);
                    }}
                >
                    Change Password
                </Styled.ChangePasswordButton>
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
