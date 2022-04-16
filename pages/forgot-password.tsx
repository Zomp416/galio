import type { NextPage } from "next";
import Head from "next/head";
import ForgotPassword from "../components/forgot-password";

const ForgotPasswordPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Forgot Your Password?</title>
            </Head>
            <ForgotPassword />
        </>
    );
};

export default ForgotPasswordPage;
