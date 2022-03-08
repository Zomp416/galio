import type { NextPage } from "next";
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

export default LoginPage;
