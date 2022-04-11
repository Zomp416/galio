import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { AuthProvider } from "../context/authcontext";
import PostLoginPage from "../components/postlogin";
import LandingPage from "../components/landing";
import Navbar from "../components/navbar";
import { getUserFromSession } from "../util/zilean";

interface Props {
    user: any;
}

const Home: NextPage<Props> = props => {
    return (
        <div>
            <Head>
                <title>Zomp</title>
            </Head>
            <AuthProvider user={props.user}>
                <Navbar domain="" />
                {props.user ? <PostLoginPage /> : <LandingPage />}
            </AuthProvider>
        </div>
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
