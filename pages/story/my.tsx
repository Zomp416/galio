import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import MyStories from "../../components/story/my";
import Navbar from "../../components/navbar";
import { AuthProvider } from "../../context/authcontext";
import { getUserFromSession } from "../../util/zilean";

interface Props {
    user: any;
}

const MyStoriesPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>My Stories</title>
            </Head>
            <AuthProvider user={props.user}>
                <Navbar domain="stories" />
                <MyStories />
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

export default MyStoriesPage;
