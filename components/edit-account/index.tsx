import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import * as Styled from "./form/styles";
import Form from "./form/form";
import { useAuthContext } from "../../context/authcontext";
import { useToastContext } from "../../context/toastcontext";
import Header from "./header";
import { deleteAccount, update } from "../../util/zileanUser";

interface IEditContext {
    formValues: {
        username: string;
        email: string;
        about: string;
        profilePicture: string;
    };
    setFormValues?: React.Dispatch<
        React.SetStateAction<{
            username: string;
            email: string;
            about: string;
            profilePicture: string;
        }>
    >;
    handleSubmit?: (event: React.FormEvent) => Promise<void>;
    handleDelete?: (event: React.FormEvent) => Promise<void>;
    modalPasswordOpen: boolean;
    setModalPasswordOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditContext = createContext<IEditContext>({
    formValues: { username: "", email: "", about: "", profilePicture: "" },
    modalPasswordOpen: false,
});

const EditAccount: React.FC = () => {
    const router = useRouter();
    const { user } = useAuthContext();
    const { addToast } = useToastContext();
    const defaultValues = {
        email: user?.email!,
        username: user?.username!,
        about: user?.about!,
        profilePicture: user?.profilePicture!,
    };
    const [formValues, setFormValues] = useState(defaultValues);
    const [modalPasswordOpen, setModalPasswordOpen] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = await update({ user: formValues });
        if (data.error) {
            setError(true);
            addToast("error", "Error in Updating Account Info");
        } else {
            router.back();
            addToast("success", "Updated Account Info");
        }
    };

    const handleDelete = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = await deleteAccount();
        if (data.error) {
            setError(true);
        } else {
            router.push("/");
        }
    };

    return (
        <Styled.EditAccountContainer>
            <EditContext.Provider
                value={{
                    formValues,
                    setFormValues,
                    handleSubmit,
                    handleDelete,
                    modalPasswordOpen,
                    setModalPasswordOpen,
                }}
            >
                <Header></Header>
                <Form></Form>
            </EditContext.Provider>
        </Styled.EditAccountContainer>
    );
};

export default EditAccount;

export const useEditContext = () => useContext(EditContext);
