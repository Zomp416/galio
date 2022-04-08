import type { NextPage } from "next";
import Head from "next/head";
import PostLoginPage from "../components/postlogin";
import LandingPage from "../components/landing";
import Navbar from "../components/navbar";

const loggedIn = true; //TODO: replace once we connect with backend

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Zomp</title>
            </Head>
            <Navbar domain="" />
            {loggedIn ? <PostLoginPage /> : <LandingPage />}
        </div>
    );
};

export default Home;
