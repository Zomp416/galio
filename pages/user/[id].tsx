import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Navbar from "../../components/navbar";
import Profile from "../../components/profile page";
import { AuthProvider } from "../../context/authcontext";
import { getUserFromSession } from "../../util/zilean";

interface Props {
    user: any;
}

const ProfilePage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>User Profile</title>
            </Head>
            <AuthProvider user={props.user}>
                <Navbar domain="user" />
                <Profile />
            </AuthProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const result = await getUserFromSession(context.req.headers.cookie || "");

    return {
        props: {
            user: result.data || null,
        },
    };
};

export default ProfilePage;
