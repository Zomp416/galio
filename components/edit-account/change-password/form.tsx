import React, { useState } from "react";
import { useRouter } from "next/router";
import * as Styled from "./styles";
import { TextField, Typography, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { useAuthContext } from "../../../context/authcontext";
import { useToastContext } from "../../../context/toastcontext";
import { useEditContext } from "..";
import { changePassword } from "../../../util/zileanUser";

const ChangePasswordForm: React.FC = () => {
    const router = useRouter();
    const { user } = useAuthContext();
    const { addToast } = useToastContext();
    const defaultValues = {
        oldpassword: "",
        newpassword: "",
        confirmpassword: "",
        password: user?.password!,
    };
    const [formValues, setFormValues] = useState(defaultValues);
    const [error, setError] = useState(false);
    const { modalPasswordOpen, setModalPasswordOpen } = useEditContext();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        if (
            formValues.oldpassword !== "" &&
            formValues.newpassword !== "" &&
            formValues.confirmpassword !== ""
        ) {
            if (formValues.newpassword === formValues.confirmpassword) {
                const data = await changePassword({ user: formValues });
                if (data.error) {
                    setError(true);
                    addToast("error", "Old Password is incorrect");
                } else {
                    addToast("success", "Updated Password");
                    setModalPasswordOpen!(false);
                }
            } else {
                setError(true);
                addToast("error", " Passwords do not match");
            }
        } else {
            setError(true);
            addToast("error", "All fields are required");
        }
    };

    return (
        <>
            <Dialog
                open={modalPasswordOpen}
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
                        <Button onClick={handleSubmit}>Done</Button>
                        <Button
                            onClick={() => {
                                setModalPasswordOpen!(false);
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
        </>
    );
};

export default ChangePasswordForm;
