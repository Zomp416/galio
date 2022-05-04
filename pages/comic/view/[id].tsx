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
}

const ViewComicPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>{props.comic.title || "Unnamed Comic"}</title>
            </Head>
            <AuthProvider user={props.user}>
                <Navbar domain="comics" />
                <ViewComic comic={props.comic} comicAuthor={props.comicAuthor} />
            </AuthProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const user = await getUserFromSession(context.req.headers.cookie || "");
    const comic = await getComic(context.params!.id!.toString());

    if (comic.data) {
        return {
            props: {
                comic: comic.data,
                user: user.data || null,
                comicAuthor: comic.data.author || null,
            },
        };
    } else {
        return {
            redirect: {
                destination: "/404",
                permanent: false,
            },
        };
    }
};

export default ViewComicPage;
