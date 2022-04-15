import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Navbar from "../../components/navbar";
import Profile from "../../components/profile page";
import { AuthProvider } from "../../context/authcontext";
import { getUserFromSession, getUserFromUsername } from "../../util/zilean";

interface Props {
    user: any;
    user2: any;
}

const ProfilePage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>User Profile</title>
            </Head>
            <AuthProvider user={props.user}>
                <Navbar domain="user" />
                <Profile user2={props.user2} />
            </AuthProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const result = await getUserFromSession(context.req.headers.cookie || "");
    const result2 = await getUserFromUsername(context.params!.id!.toString());
    let finalResult: any;
    if (!result2.error) {
        finalResult = result2.data;
    } else {
        finalResult = result.data;
    }

    return {
        props: {
            user: result.data || null,
            user2: finalResult,
        },
    };
};

export default ProfilePage;
