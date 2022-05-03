import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import PostLoginPage from "../components/postlogin";
import LandingPage from "../components/landing";
import Navbar from "../components/navbar";
import { AuthProvider } from "../context/authcontext";
import { getUserFromSession } from "../util/zileanUser";

interface Props {
    user: any;
}

const Home: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>Zomp</title>
            </Head>
            <AuthProvider user={props.user}>
                <Navbar domain="home" />
                {props.user ? <PostLoginPage /> : <LandingPage />}
            </AuthProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async context => {
    const result = await getUserFromSession(context.req.headers.cookie || "");

    return {
        props: {
            user: result.data || null,
        },
    };
};

export default Home;
