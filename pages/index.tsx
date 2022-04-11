import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import PostLoginPage from "../components/postlogin";
import LandingPage from "../components/landing";
import Navbar from "../components/navbar";
import { getUserFromSession } from "../util/zilean";

// TEMP prop interface to simply indicate log in status,
// We want to eventually pass the user instead (if there is one)
interface Props {
    loggedIn: boolean;
}

const Home: NextPage<Props> = props => {
    return (
        <div>
            <Head>
                <title>Zomp</title>
            </Head>
            <Navbar domain="" />
            {props.loggedIn ? <PostLoginPage /> : <LandingPage />}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async context => {
    const result = await getUserFromSession(context.req.headers.cookie || "");

    // If there is an error, the user it not logged in
    if (result.error) {
        return {
            props: {
                loggedIn: false,
            },
        };
    }

    // No error means that the backend was able to retrieve the user from the session cookie.
    return {
        props: {
            loggedIn: true,
        },
    };
};

export default Home;
