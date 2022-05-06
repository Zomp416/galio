import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert, Typography, AlertColor } from "@mui/material";

interface IToastContext {
    addToast: (variant: AlertColor, text: string) => void;
}

const ToastContext = createContext<IToastContext>({
    addToast: (variant: AlertColor, text: string) => {},
});

export const ToastProvider: React.FC = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [toast, setToast] = useState<string>("I love toast");
    const [toastVariant, setToastVariant] = useState<AlertColor>("success");

    const addToast = (variant: AlertColor, text: string) => {
        setToast(text);
        setToastVariant(variant);
        setOpen(true);
    };

    const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <ToastContext.Provider
            value={{
                addToast,
            }}
        >
            {children}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleCloseToast}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={handleCloseToast}
                    severity={toastVariant}
                    sx={{ width: "100%", backgroundColor: "green", color: "white" }}
                >
                    <Typography fontWeight="bold">{toast}</Typography>
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
};

export const useToastContext = () => useContext(ToastContext);
