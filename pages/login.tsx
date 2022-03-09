import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Login from "../components/login";

const LoginPage: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Login to Zomp</title>
            </Head>
            <Login />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    // Pass session cookie in request to backend
    const res = await fetch(`http://localhost:3001/test-check`, {
        method: "GET",
        headers: {
            cookie: context.req.headers.cookie || "",
        },
    });
    const data = await res.json();

    // If there is an error, continue to login page
    if (!data || res.status != 200 || data.error) {
        return {
            props: {},
        };
    }
    // No error means that the backend was able to retrieve the user from the session cookie.
    // TODO Redirect to better destination
    return {
        redirect: {
            destination: "/",
            permanent: false,
        },
    };
};

export default LoginPage;
