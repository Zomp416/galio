import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { StyledForm } from "./styles";
import { sendEmail } from "../../util/zilean";

const Form: React.FC = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [sent, setSent] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = await sendEmail("send-verify", email);
        if (data.error) {
            setError(true);
        } else {
            setSent(true);
        }
    };

    const handleSendAnother = async (event: React.FormEvent) => {
        event.preventDefault();
        setEmail("");
        setSent(false);
        setError(false);
    };

    return (
        <>
            {sent ? (
                <StyledForm onSubmit={handleSendAnother}>
                    <Typography variant="h5">
                        If an account exists, an email will be sent with instructions to verify your
                        email.
                    </Typography>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ fontSize: "1.25rem", width: "50%" }}
                    >
                        Send Another
                    </Button>
                </StyledForm>
            ) : (
                <>
                    <StyledForm onSubmit={handleSubmit}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={handleInputChange}
                            error={error}
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ fontSize: "1.25rem", width: "50%" }}
                        >
                            Submit
                        </Button>
                    </StyledForm>
                    <div style={{ marginTop: "20px" }}>
                        {error && (
                            <Typography color="error" variant="h5">
                                There was an error trying to submit your request.
                            </Typography>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default Form;
