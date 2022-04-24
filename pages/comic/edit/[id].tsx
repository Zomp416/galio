import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import EditComic from "../../../components/comic/edit";
import Navbar from "../../../components/navbar";
import { AuthProvider } from "../../../context/authcontext";
import { ComicProvider } from "../../../context/comiccontext";
import { IComic } from "../../../context/comiccontext/model";
import { getUserFromSession, getEditComic } from "../../../util/zilean";

interface Props {
    user: any;
    comic: IComic;
}

const myComic: IComic = {
    _id: "TEST",
    title: "taquito",
    description: "im on a ta-'quito diet'",
    tags: [],
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
                <ComicProvider init_comic={props.comic}>
                    <Navbar domain="comics" />
                    <EditComic />
                </ComicProvider>
            </AuthProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const result = await getUserFromSession(context.req.headers.cookie || "");
    const comicRes = await getEditComic(
        context.req.headers.cookie || "",
        (context.params?.id as string) || "yikes"
    );

    // TODO REDIRECT IF NO COMIC WITH ID
    let comic = myComic;
    if (!comicRes.error && comicRes.data) {
        comic = comicRes.data;
    }

    //TODO confirm proper author
    return {
        props: {
            comic,
            user: result.data || null,
        },
    };
};

export default EditComicPage;
