import React, { useState } from "react";
import { useRouter } from "next/router";
import * as Styled from "./styles";
import { TextField, Typography, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { useAuthContext } from "../../../context/authcontext";
import { useImageContext } from "../../../context/imagecontext";
import { deleteAccount } from "../../../util/zileanUser";

const ChangePasswordForm: React.FC = () => {
    const router = useRouter();
    const { user } = useAuthContext();
    const { image } = useImageContext();

    const defaultValues = {
        email: user?.email!,
        username: user?.username!,
        oldpassword: "",
        newpassword: "",
        confirmpassword: "",
        about: user?.about!,
        password: user?.password!,
        profilePicture: image?.imageURL,
    };
    const [formValues, setFormValues] = useState(defaultValues);
    const [error, setError] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [finalImage, setFinalImage] = useState<File>();
    const [modalPasswordOpen, setModalPasswordOpen] = useState<boolean>(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "profilePicture" && event.target.files!.length !== 0) {
            setImagePreview(URL.createObjectURL(event.target.files![0]));
            setFinalImage(event.target.files![0]);
        } else {
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }
    };
    
    return (
        <>
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
        </>
    );
};

export default ChangePasswordForm;
