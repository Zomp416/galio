import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import CreateNewStory from "../../components/story/create-new-story";
import Navbar from "../../components/navbar";

const SearchPage: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Create New Story</title>
            </Head>
            <div
                style={{
                    width: "100%",
                    height: "50px",
                    backgroundColor: "#3F3F3F",
                    color: "white",
                }}
            >
                <Navbar domain="stories" />
            </div>
            <CreateNewStory />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    // Pass session cookie in request to backend
    // const data = await getUserFromSession(context.req.headers.cookie || "");

    // TODO get query params and pass in request to backend

    return {
        props: {},
    };
};

export default SearchPage;
