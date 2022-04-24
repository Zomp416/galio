import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import EditStory from "../../../components/story/edit";
import Navbar from "../../../components/navbar";
import { AuthProvider } from "../../../context/authcontext";
import { getUserFromSession } from "../../../util/zilean";

interface Props {
    user: any;
}

const LoginPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>Story Title</title>
            </Head>
            <AuthProvider user={props.user}>
                <Navbar domain="stories" />
                <EditStory />
            </AuthProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    //TODO REMOVE TEST COMIC
    const testComic = {
        _id: context.params?.id,
        title: "Mason Ma is So Cool!",
        description: "Here is my description",
        tags: [],
        renderedImage: "Types.ObjectId",
        author: "Types.ObjectId",
        layers: [],
        views: 1056,
        ratingTotal: 1000,
        ratingCount: 300,
        comments: [],
        createdAt: "new Date()",
        updatedAt: "new Date()",
        publishedAt: "new Date()",
    };

    const result = await getUserFromSession(context.req.headers.cookie || "");
    //TODO confirm proper author
    //TODO should be story
    return {
        props: {
            comic: testComic,
            user: result.data || null,
        },
    };
};

export default LoginPage;
