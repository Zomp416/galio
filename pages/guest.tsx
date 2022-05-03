import type { NextPage, GetServerSideProps } from "next";
import React from "react";
import Head from "next/head";
import PostLoginPage from "../components/postlogin";
import Navbar from "../components/navbar";
import { AuthProvider } from "../context/authcontext";
import { getUserFromSession } from "../util/zileanUser";

interface Props {
    user: any;
}

//TODO fix bug where logged in users visit guest page
const GuestPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>Zomp</title>
            </Head>
            <AuthProvider user={props.user}>
                <Navbar domain="home" />
                <PostLoginPage />
            </AuthProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async context => {
    const result = await getUserFromSession(context.req.headers.cookie || "");

    if (!result.data) {
        return {
            props: {
                user: result.data || null,
            },
        };
    }
    return {
        redirect: {
            destination: "/",
            permanent: false,
        },
    };
};

export default GuestPage;
