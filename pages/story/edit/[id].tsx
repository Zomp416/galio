import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import EditStory from "../../../components/story/edit";
import Navbar from "../../../components/navbar";
import { AuthProvider } from "../../../context/authcontext";
import { StoryProvider } from "../../../context/storycontext";
import { IStory } from "../../../context/storycontext/model";
import { getUserFromSession, getStory } from "../../../util/zilean";

interface Props {
    user: any;
    story: IStory;
}

const LoginPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>Story Title</title>
            </Head>
            <AuthProvider user={props.user}>
                <StoryProvider story={props.story}>
                    <Navbar domain="stories" />
                    <EditStory />
                </StoryProvider>
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
    const storyRes = await getStory(context.params?.id as string);

    //TODO confirm proper author
    //TODO should be story
    return {
        props: {
            story: storyRes.data,
            user: result.data || null,
        },
    };
};

export default LoginPage;
