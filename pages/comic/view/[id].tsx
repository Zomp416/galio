import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import ViewComic from "../../../components/comic/view";
import Navbar from "../../../components/navbar";
import { AuthProvider } from "../../../context/authcontext";
import { getUserFromSession, getComic, getUserFromID } from "../../../util/zilean";

interface Props {
    user: any;
    comic: any;
    comicAuthor: any;
}

const ViewComicPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>Comic Title</title>
            </Head>
            <AuthProvider user={props.user}>
                <Navbar domain="comics" />
                <ViewComic comic={props.comic} comicAuthor={props.comicAuthor} />
            </AuthProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const comic = await getComic(context.params!.id!.toString());
    const comicAuthor = await getUserFromID(comic.data.author.toString());
    const result = await getUserFromSession(context.req.headers.cookie || "");
    return {
        props: {
            comic: comic.data,
            user: result.data || null,
            comicAuthor: comicAuthor.data,
        },
    };
};

export default ViewComicPage;
