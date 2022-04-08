import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import MyComics from "../../components/comic/my";
import Navbar from "../../components/navbar";

const MyComicsPage: NextPage = () => {
    return (
        <div>
            <Head>
                <title>My Comics</title>
            </Head>
            {/* TODO: dynamically set navbar; maybe not because this is view comics */}
            <Navbar domain="comics" />
            <MyComics />
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

export default MyComicsPage;
