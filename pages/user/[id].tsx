import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Navbar from "../../components/navbar";
import Profile from "../../components/profile";
import { AuthProvider } from "../../context/authcontext";
import { getImage } from "../../util/zilean";
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
            <AuthProvider user={props.user}>
                <Navbar domain="user" />
                <Profile
                    user2={props.user2}
                    userSubs={props.userSubs}
                    userProfile={props.userProfile}
                />
            </AuthProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const result = await getUserFromSession(context.req.headers.cookie || "");
    const result2 = await getUserFromUsername(context.params!.id!.toString());
    if (result2.data?.profilePicture) {
        const result3 = await getImage(result2.data?.profilePicture);
        return {
            props: {
                user: result.data || null,
                user2: result2.data || null,
                userSubs: result2.data.subscriptions,
                userProfile: result3.data?.imageURL || null,
            },
        };
    } else {
        return {
            props: {
                user: result.data || null,
                user2: result2.data || null,
                userSubs: result2.data.subscriptions,
                userProfile: null,
            },
        };
    }
};

export default ProfilePage;
