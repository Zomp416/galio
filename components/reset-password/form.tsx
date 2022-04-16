import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, TextField, Typography } from "@mui/material";
import { StyledForm } from "./styles";
import { sendIdAndToken } from "../../util/zilean";

interface Props {
    id: string;
    token: string;
}

const Form: React.FC<Props> = props => {
    const router = useRouter();
    const [formValues, setFormValues] = useState({
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(false);
    const [sent, setSent] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (formValues.password && formValues.password !== formValues.confirmPassword) {
            return;
        }
        const res = await sendIdAndToken("reset-password", {
            id: props.id,
            token: props.token,
            password: formValues.password,
        });
        if (res.error) {
            setError(true);
        } else {
            setError(false);
            setSent(true);
        }
    };

    const handleGoHome = async (event: React.FormEvent) => {
        event.preventDefault();
        router.push("/");
    };

    return (
        <>
            {sent ? (
                <StyledForm onSubmit={handleGoHome}>
                    <Typography variant="h5">Your password has been successfully reset!</Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ fontSize: "1.25rem", width: "50%" }}
                    >
                        Go Home
                    </Button>
                </StyledForm>
            ) : (
                <>
                    <StyledForm onSubmit={handleSubmit}>
                        <TextField
                            required
                            id="password"
                            name="password"
                            label="New Password"
                            type="password"
                            variant="outlined"
                            value={formValues.password}
                            onChange={handleInputChange}
                            error={error}
                            fullWidth
                        />
                        <TextField
                            required
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            value={formValues.confirmPassword}
                            onChange={handleInputChange}
                            error={
                                !!formValues.password &&
                                formValues.password !== formValues.confirmPassword
                            }
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ fontSize: "1.25rem", width: "50%" }}
                            disabled={
                                !!formValues.password &&
                                formValues.password !== formValues.confirmPassword
                            }
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
