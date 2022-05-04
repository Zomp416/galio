import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import ViewComic from "../../../components/comic/view";
import Navbar from "../../../components/navbar";
import { AuthProvider } from "../../../context/authcontext";
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
                <Navbar domain="comics" />
                <ViewComic comic={props.comic} comicAuthor={props.comicAuthor} />
            </AuthProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    //The _id will always be 24 characters long by MongoDB
    if (context.params!.id!.toString().length == 24) {
        const comic = await getComic(context.params!.id!.toString());
        const result = await getUserFromSession(context.req.headers.cookie || "");

        if (comic.data?.publishedAt) {
            return {
                props: {
                    comic: comic.data,
                    user: result.data || null,
                    comicAuthor: comic.data?.author || null,
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

export default ViewComicPage;
