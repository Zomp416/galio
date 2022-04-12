import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Register from "../components/register";
import { getUserFromSession } from "../util/zilean";

const LoginPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Create a Zomp Account</title>
            </Head>
            <Register />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const result = await getUserFromSession(context.req.headers.cookie || "");

    // If there is an error, continue to register page
    if (result.error) {
        return {
            props: {},
        };
    }

    // No error means that the backend was able to retrieve the user from the session cookie.
    return {
        redirect: {
            destination: "/",
            permanent: false,
        },
    };
};

export default LoginPage;
