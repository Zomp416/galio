import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import EditComic from "../../../components/comic/edit";
import Navbar from "../../../components/navbar";

const EditComicPage: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Comic Title</title>
            </Head>
            <Navbar domain="comics" />
            <EditComic />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    // Pass session cookie in request to backend
    // const data = await getUserFromSession(context.req.headers.cookie || "");

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

    return {
        props: {
            comic: testComic,
            user: testUser,
        },
    };
};

export default EditComicPage;
