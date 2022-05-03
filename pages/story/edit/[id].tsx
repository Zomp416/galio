import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import EditStory from "../../../components/story/edit";
import Navbar from "../../../components/navbar";
import { AuthProvider } from "../../../context/authcontext";
import { StoryProvider } from "../../../context/storycontext";
import { IStory } from "../../../context/storycontext/model";
import { getUserFromSession, } from "../../../util/zileanUser";
import { getStory } from "../../../util/zileanStory";

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
                <StoryProvider storyText={props.story}>
                    <Navbar domain="stories" />
                    <EditStory />
                </StoryProvider>
            </AuthProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const result = await getUserFromSession(context.req.headers.cookie || "");
    const storyRes = await getStory(context.params?.id as string);

    //Prevents editing of published
    if (storyRes.data?.publishedAt == null) {
        //Confirms proper author
        if (storyRes.data?.author == result.data?._id) {
            return {
                props: {
                    story: storyRes.data,
                    user: result.data || null,
                },
            };
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
