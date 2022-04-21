import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import EditComic from "../../../components/comic/edit";
import Navbar from "../../../components/navbar";
import { AuthProvider } from "../../../context/authcontext";
import { ComicProvider } from "../../../context/comiccontext";
import { getUserFromSession } from "../../../util/zilean";

interface Props {
    user: any;
}

const myComic = {
    title: "taquito",
    description: "im on a ta-'quito diet'",
    layers: [
        {
            type: "panel",
            name: "Layer 01",
            visible: true,
            x: 200,
            y: 100,
            width: 500,
            height: 500,
            rotation: 0,
            xFlip: false,
            yFlip: false,
            properties: {
                backgroundColor: "white",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "black",
                borderRadius: "0px",
            },
        },
        {
            type: "image",
            name: "Layer 02",
            visible: true,
            x: 250,
            y: 150,
            width: 300,
            height: 300,
            rotation: 0,
            xFlip: false,
            yFlip: false,
            properties: {
                imageURL:
                    "https://gimmedelicious.com/wp-content/uploads/2019/11/chicken-taquitos-feature-1.jpg",
            },
        },
        {
            type: "text",
            name: "Layer 03",
            visible: true,
            x: 250,
            y: 100,
            width: 150,
            height: 30,
            rotation: 0,
            xFlip: false,
            yFlip: false,
            properties: {
                text: "I Hate Taquitos",
                color: "black",
                fontSize: "16px",
                fontWeight: "normal",
                fontStyle: "normal",
                textDecoration: "none",
                justifyContent: "center",
                alignItems: "center",
            },
        },
    ],
};

const EditComicPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>Comic Title</title>
            </Head>
            <AuthProvider user={props.user}>
                <ComicProvider init_comic={myComic}>
                    <Navbar domain="comics" />
                    <EditComic />
                </ComicProvider>
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
