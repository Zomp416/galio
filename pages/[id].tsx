import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";
import Profile from "../components/profile page";

const ProfilePage: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Zomp Search</title>
            </Head>
            {/* TODO: dynamically set navbar */}
            <Navbar domain="comics" />
            <Profile />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    // Pass session cookie in request to backend
    // const data = await getUserFromSession(context.req.headers.cookie || "");

    // TODO get query params and pass in request to backend

    return {
        props: {},
    };
};

export default ProfilePage;
