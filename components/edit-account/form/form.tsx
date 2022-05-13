import React, { useState } from "react";
import * as Styled from "./styles";
import { TextField, Typography, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { useEditContext } from "..";
import ChangePasswordForm from "../change-password/form";

const Form: React.FC = () => {
    const { formValues, setFormValues, handleDelete, modalPasswordOpen, setModalPasswordOpen } =
        useEditContext();
    const [error, setError] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues!({
            ...formValues,
            [name]: value,
        });
    };

    return (
        <>
            {modalPasswordOpen ? <ChangePasswordForm></ChangePasswordForm> : <></>}
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
            <Styled.ButtonsContainer>
                <Styled.DeleteAccountButton
                    variant="contained"
                    onClick={() => {
                        setModalDeleteOpen(true);
                    }}
                >
                    Delete Account
                </Styled.DeleteAccountButton>
                <Button
                    variant="contained"
                    component="span"
                    style={{ width: "15%" }}
                    onClick={() => {
                        setModalPasswordOpen!(true);
                    }}
                >
                    Change Password
                </Button>
            </Styled.ButtonsContainer>
        </>
    );
};

export default Form;
