import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import * as Styled from "./form/styles";
import Form from "./form/form";
import { useAuthContext } from "../../context/authcontext";
import Header from "./header";
import { deleteAccount, update } from "../../util/zileanUser";

interface IEditContext {
    formValues: {
        username: string;
        email: string;
        about: string;
    };
    setFormValues?: React.Dispatch<
        React.SetStateAction<{ username: string; email: string; about: string }>
    >;
    handleSubmit?: () => Promise<void>;
    handleDelete?: () => Promise<void>;
}

const EditContext = createContext<IEditContext>({
    formValues: { username: "", email: "", about: "" },
});

const EditAccount: React.FC = () => {
    const router = useRouter();
    const { user } = useAuthContext();
    const defaultValues = {
        email: user?.email!,
        username: user?.username!,
        // oldpassword: "",
        // newpassword: "",
        // confirmpassword: "",
        about: user?.about!,
        // password: user?.password!,
        // profilePicture: user?.profilePicture!,
    };
    const [formValues, setFormValues] = useState(defaultValues);
    const [error, setError] = useState(false);
    // const [imagePreview, setImagePreview] = useState("");
    // const [finalImage, setFinalImage] = useState<File>();
    // const [modalPasswordOpen, setModalPasswordOpen] = useState<boolean>(false);
    // const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        const data = await update({ user: formValues });
        if (data.error) {
            setError(true);
        } else {
            router.back();
        }
    };

    const handleDelete = async () => {
        const data = await deleteAccount();
        if (data.error) {
            setError(true);
        } else {
            router.push("/");
        }
    };

    //Header- Profile Picture, Save, Cancel
    //Form- All the other stuff (Username, Email, About)
    //Modal-Change Password (all the password related stuff)
    return (
        <Styled.EditAccountContainer>
            <EditContext.Provider value={{ formValues, setFormValues, handleSubmit, handleDelete }}>
                <Header></Header>
                <Form></Form>
            </EditContext.Provider>
        </Styled.EditAccountContainer>
    );
};

export default EditAccount;

export const useEditContext = () => useContext(EditContext);
