import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import ViewStory from "../../../components/story/view";
import Navbar from "../../../components/navbar";
import { AuthProvider } from "../../../context/authcontext";
import { getUserFromSession } from "../../../util/zilean";

interface Props {
    user: any;
    story: any;
    storyAuthor: any;
}

const LoginPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>Story Title</title>
            </Head>
            <AuthProvider user={props.user}>
                <Navbar domain="stories" />
                <ViewStory story={props.story} storyAuthor={props.storyAuthor} />
            </AuthProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    //const story = await getStory(context.params!.id!.toString());
    const result = await getUserFromSession(context.req.headers.cookie || "");

    //TODO REMOVE TEST STORY
    const testStory = {
        _id: context.params?.id,
        title: "Crewmate",
        description: "Here is my description",
        tags: ["test", "amongus"],
        story: [],
        author: result.data,
        views: 1056,
        ratingTotal: 1000,
        ratingCount: 300,
        comments: [],
        coverart:
            "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/crewmate-indra-tirto.jpg",
        createdAt: "new Date()",
        updatedAt: "new Date()",
        publishedAt: "new Date()",
    };

    return {
        props: {
            story: testStory, //story.data
            user: result.data || null,
            storyAuthor: testStory.author || null, //story.data?.author || null,
        },
    };
};

export default LoginPage;
