import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, TextField, Typography } from "@mui/material";
import { StyledForm } from "./styles";

const defaultValues = {
    email: "",
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
        const res = await fetch(`http://localhost:3001/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues),
        });
        const data = await res.json();
        if (!data || res.status !== 200) {
            setError(true);
        } else {
            // TODO find best location to redirect
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
                    Sign In
                </Button>
            </StyledForm>
            <div style={{ marginTop: "20px" }}>
                {error && (
                    <Typography color="error" variant="h5">
                        Invalid Login Credentials.
                    </Typography>
                )}{" "}
                {/* TODO CHANGE URL TO FORGOT PASSWORD PAGE */}
                <Link href="/api/hello">Forgot Your Password?</Link>
            </div>
        </>
    );
};

export default Form;
