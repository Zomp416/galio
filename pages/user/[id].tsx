import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Navbar from "../../components/navbar";
import Profile from "../../components/profile";
import { AuthProvider } from "../../context/authcontext";
import { ToastProvider } from "../../context/toastcontext";
import { getUserFromSession, getUserFromUsername } from "../../util/zileanUser";

interface Props {
    user: any;
    user2: any;
    userSubs: any;
    userProfile: any;
}

const ProfilePage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>User Profile</title>
            </Head>
            <ToastProvider>
                <AuthProvider user={props.user}>
                    <Navbar domain="user" />
                    <Profile
                        user2={props.user2}
                        userSubs={props.userSubs}
                        userProfile={props.userProfile}
                    />
                </AuthProvider>
            </ToastProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const result = await getUserFromSession(context.req.headers.cookie || "");
    const result2 = await getUserFromUsername(context.params!.id!.toString());
    if (result2.data) {
        return {
            props: {
                user: result.data || null,
                user2: result2.data || null,
                userSubs: result2.data.subscriptions,
                userProfile: result2.data?.profilePicture || null,
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

export default ProfilePage;
