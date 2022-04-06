import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import ViewComic from "../../../components/comic/view";

const LoginPage: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Comic Title</title>
            </Head>
            <div
                style={{
                    width: "100%",
                    height: "50px",
                    backgroundColor: "#3F3F3F",
                    color: "white",
                }}
            >
                Temp Navbar
            </div>
            <ViewComic />
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

export default LoginPage;