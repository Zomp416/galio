import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import ViewComic from "../../../components/comic/view";
import Navbar from "../../../components/navbar";
import { AuthProvider } from "../../../context/authcontext";
import { ImageProvider } from "../../../context/imagecontext";
//import { getImage } from "../../../util/zilean";
import { getUserFromSession } from "../../../util/zileanUser";
import { getComic } from "../../../util/zileanComic";

interface Props {
    user: any;
    comic: any;
    comicAuthor: any;
    comicImage: any;
}

const ViewComicPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>{props.comic.title}</title>
            </Head>
            <AuthProvider user={props.user}>
                <ImageProvider image={props.comicImage}>
                    <Navbar domain="comics" />
                    <ViewComic comic={props.comic} comicAuthor={props.comicAuthor} />
                </ImageProvider>
            </AuthProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const comic = await getComic(context.params!.id!.toString());
    const result = await getUserFromSession(context.req.headers.cookie || "");

    if (comic.data?.publishedAt) {
        return {
            props: {
                comic: comic.data,
                user: result.data || null,
                comicAuthor: comic.data?.author || null,
                comicImage: comic.data?.renderedImage || null,
            },
        };
    }
    return {
        redirect: {
            destination: "/",
            permanent: false,
        },
    };
};

export default ViewComicPage;
