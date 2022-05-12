import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import EditComic from "../../../components/comic/edit";
import Navbar from "../../../components/navbar";
import { ToastProvider } from "../../../context/toastcontext";
import { AuthProvider } from "../../../context/authcontext";
import { ComicProvider } from "../../../context/comiccontext";
import { IComic } from "../../../context/comiccontext/model";
import { getUserFromSession } from "../../../util/zileanUser";
import { getEditComic } from "../../../util/zileanComic";

interface Props {
    user: any;
    comic: IComic;
}

const EditComicPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>Comic Title</title>
            </Head>
            <ToastProvider>
                <AuthProvider user={props.user}>
                    <ComicProvider init_comic={props.comic}>
                        <Navbar domain="comics" />
                        <EditComic />
                    </ComicProvider>
                </AuthProvider>
            </ToastProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    //The _id will always be 24 characters long by MongoDB
    if (context.params!.id!.toString().length == 24) {
        const result = await getUserFromSession(context.req.headers.cookie || "");
        const comicRes = await getEditComic(
            context.req.headers.cookie || "",
            (context.params?.id as string) || "yikes"
        );

        let comic = comicRes.data;
        if (!comicRes.error) {
            comic = comicRes.data;
        }

        //Prevents editing of published
        if (comic?.publishedAt == null) {
            //Confirms proper author
            if (comic?.author == result.data?._id) {
                return {
                    props: {
                        comic,
                        user: result.data || null,
                    },
                };
            }
        }
    }
    return {
        redirect: {
            destination: "/",
            permanent: false,
        },
    };
};

export default EditComicPage;
