import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import CreateNewStory from "../../components/story/create-new-story";
import Navbar from "../../components/navbar";
import { AuthProvider } from "../../context/authcontext";
import { getUserFromSession } from "../../util/zilean";

interface Props {
    user: any;
}

const CreateNewStoryPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>Create New Story</title>
            </Head>
            <AuthProvider user={props.user}>
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
            </AuthProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const result = await getUserFromSession(context.req.headers.cookie || "");

    if (result.data) {
        if (result.data.verified) {
            //only verified users
            return {
                props: {
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

export default CreateNewStoryPage;
