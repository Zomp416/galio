import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import ViewStory from "../../../components/story/view";
import Navbar from "../../../components/navbar";
import { AuthProvider } from "../../../context/authcontext";
import { getUserFromSession, getUserFromID } from "../../../util/zileanUser";
import { getStory } from "../../../util/zileanStory";

interface Props {
    user: any;
    story: any;
    storyAuthor: any;
    coverArt: any;
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
    //The _id will always be 24 characters long by MongoDB
    if (context.params!.id!.toString().length == 24) {
        const story = await getStory(context.params!.id!.toString());
        //Validate that the story is real
        if (story.data) {
            const result = await getUserFromSession(context.req.headers.cookie || "");
            const author = await getUserFromID(story.data?.author);
            //Check if the story is published
            if (story.data?.publishedAt) {
                return {
                    props: {
                        story: story.data || null,
                        user: result.data || null,
                        storyAuthor: author.data || null,
                    },
                };
            }
        }
    }
    return {
        redirect: {
            destination: "/",
            permanent: false,
        },
    };
};

export default LoginPage;
