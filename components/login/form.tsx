import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { StyledForm } from "./styles";

const defaultValues = {
    email: "",
    password: "",
};

const Form: React.FC = () => {
    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formValues);
    };

    return (
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
    );
};

export default Form;
