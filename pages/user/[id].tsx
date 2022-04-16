import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../../components/navbar";
import Profile from "../../components/profile page";
import { AuthProvider } from "../../context/authcontext";
import { UserProvider } from "../../context/usercontext";
import { getUserFromSession, getUser } from "../../util/zilean";

interface Props {
    user: any;
    user_view: any;
}

const ProfilePage: NextPage<Props> = props => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <>
            <Head>
                <title>User Profile</title>
            </Head>
            <AuthProvider user={props.user}>
                <UserProvider user={props.user_view}>
                    <Navbar domain="user" />
                    <Profile />
                </UserProvider>
            </AuthProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const { id } = context.query;

    const result1 = await getUserFromSession(context.req.headers.cookie || "");
    const result2 = await getUser(id as string);

    return {
        props: {
            user: result1.data || null,
            user_view: result2.data || null,
        },
    };
};

export default ProfilePage;
