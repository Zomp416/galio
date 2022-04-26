import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import ViewStory from "../../../components/story/view";
import Navbar from "../../../components/navbar";
import { AuthProvider } from "../../../context/authcontext";
import { getUserFromSession, getStory, getUserFromID, getImage } from "../../../util/zilean";

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
                <ViewStory
                    story={props.story}
                    storyAuthor={props.storyAuthor}
                    coverArt={props.coverArt}
                />
            </AuthProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const story = await getStory(context.params!.id!.toString());
    const result = await getUserFromSession(context.req.headers.cookie || "");
    const author = await getUserFromID(story.data?.author);
    if (story.data?.coverart) {
        const art = await getImage(story.data?.coverart);
        return {
            props: {
                story: story.data || null,
                user: result.data || null,
                storyAuthor: author.data || null,
                coverArt: art.data?.imageURL || null,
            },
        };
    } else {
        return {
            props: {
                story: story.data || null,
                user: result.data || null,
                storyAuthor: author.data || null,
                coverArt: null,
            },
        };
    }
};

export default LoginPage;
