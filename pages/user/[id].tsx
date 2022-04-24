import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Navbar from "../../components/navbar";
import Profile from "../../components/profile";
import { AuthProvider } from "../../context/authcontext";
import { getUserFromSession, getUserFromUsername, getUserFromID } from "../../util/zilean";

interface Props {
    user: any;
    user2: any;
    userSubs: any;
}

const ProfilePage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>User Profile</title>
            </Head>
            <AuthProvider user={props.user}>
                <Navbar domain="user" />
                <Profile user2={props.user2} userSubs={props.userSubs} />
            </AuthProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const result = await getUserFromSession(context.req.headers.cookie || "");
    const result2 = await getUserFromUsername(context.params!.id!.toString());

    return {
        props: {
            user: result.data || null,
            user2: result2.data || null,
            userSubs: result2.data.subscriptions,
        },
    };
};

export default ProfilePage;
