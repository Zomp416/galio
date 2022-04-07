import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Hub from "../../components/comic/hub";

const HubPage: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Community Hub</title>
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
            <Hub />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
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

export default HubPage;
