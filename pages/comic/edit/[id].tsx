import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import EditComic from "../../../components/comic/edit";
import Navbar from "../../../components/navbar";
import { AuthProvider } from "../../../context/authcontext";
import { getUserFromSession } from "../../../util/zilean";

interface Props {
    user: any;
}

const EditComicPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>Comic Title</title>
            </Head>
            <AuthProvider user={props.user}>
                <Navbar domain="comics" />
                <EditComic />
            </AuthProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    //TODO REMOVE TEST COMIC
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

    const result = await getUserFromSession(context.req.headers.cookie || "");

    return {
        props: {
            comic: testComic,
            user: result.data || null,
        },
    };
};

export default EditComicPage;
