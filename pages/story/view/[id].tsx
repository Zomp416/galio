import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import ViewStory from "../../../components/story/view";
import Navbar from "../../../components/navbar";
import { AuthProvider } from "../../../context/authcontext";
import { ToastProvider } from "../../../context/toastcontext";
import { getUserFromSession } from "../../../util/zileanUser";
import { viewStory } from "../../../util/zileanStory";

interface Props {
    user: any;
    story: any;
    storyAuthor: any;
}

const ViewComicPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>{props.story.title || "Unnamed Story"}</title>
            </Head>
            <ToastProvider>
                <AuthProvider user={props.user}>
                    <Navbar domain="stories" />
                    <ViewStory story={props.story} storyAuthor={props.storyAuthor} />
                </AuthProvider>
            </ToastProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const user = await getUserFromSession(context.req.headers.cookie || "");
    const story = await viewStory(context.params!.id!.toString());

    if (story.data) {
        return {
            props: {
                story: story.data,
                user: user.data || null,
                storyAuthor: story.data.author || null,
            },
        };
    } else {
        return {
            redirect: {
                destination: "/404",
                permanent: false,
            },
        };
    }
};

export default ViewComicPage;
