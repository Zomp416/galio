import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, TextField, Typography } from "@mui/material";
import { StyledForm } from "./styles";
import { register } from "../../util/zileanUser";

const defaultValues = {
    email: "",
    username: "",
    password: "",
};

const Form: React.FC = () => {
    const router = useRouter();
    const [formValues, setFormValues] = useState(defaultValues);
    const [error, setError] = useState(false);

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
        const data = await register(formValues);
        if (data.error) {
            setError(true);
        } else {
            router.push("/");
        }
    };

    return (
        <>
            <StyledForm onSubmit={handleSubmit}>
                <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={formValues.email}
                    onChange={handleInputChange}
                    error={error}
                    fullWidth
                />
                <TextField
                    required
                    id="username"
                    name="username"
                    label="Username"
                    type="text"
                    variant="outlined"
                    value={formValues.username}
                    onChange={handleInputChange}
                    error={error}
                    fullWidth
                />
                <TextField
                    required
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={formValues.password}
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
                    Sign Up
                </Button>
            </StyledForm>
            <div style={{ marginTop: "20px" }}>
                {error && (
                    <Typography color="error" variant="h5">
                        Invalid Form Values.
                    </Typography>
                )}{" "}
            </div>
        </>
    );
};

export default Form;
