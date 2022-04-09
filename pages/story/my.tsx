import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import MyStories from "../../components/story/my";
import Navbar from "../../components/navbar";

const MyStoriesPage: NextPage = () => {
    return (
        <div>
            <Head>
                <title>My Stories</title>
            </Head>
            {/* TODO: dynamically set navbar; maybe not because this is view comics */}
            <Navbar domain="stories" />
            <MyStories />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const testUser = {
        username: "MasonMa37",
        email: "masonma37@gmail.com",
        password: "12345678",
        verified: true,
        comics: [],
        stories: [],
        subscriptions: [],
        subscriberCount: 3,
        profilePicture: "Types.ObjectId",
        comicRatings: [],
        storyRatings: [],
        createdAt: "new Date()",
        updatedAt: "new Date()",
    };

    return {
        props: {
            user: testUser,
        },
    };
};

export default MyStoriesPage;
