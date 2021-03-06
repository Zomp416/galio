import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import MyComics from "../../components/comic/my";
import Navbar from "../../components/navbar";
import { AuthProvider } from "../../context/authcontext";
import { ToastProvider } from "../../context/toastcontext";
import { getUserFromSession } from "../../util/zileanUser";
import { getComic } from "../../util/zileanComic";

interface Props {
    user: any;
    published: any[];
    unpublished: any[];
}

const MyComicsPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>My Comics</title>
            </Head>{" "}
            <ToastProvider>
                <AuthProvider user={props.user}>
                    <Navbar domain="comics" />
                    <MyComics published={props.published} unpublished={props.unpublished} />
                </AuthProvider>{" "}
            </ToastProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const result = await getUserFromSession(context.req.headers.cookie || "");
    var published: any[] = [];
    var unpublished: any[] = [];
    if (result.data) {
        var comics = result.data.comics;
        for (var i = 0; i < comics!.length; i++) {
            const result2 = await getComic(comics![i]);
            if (result2.data) {
                if (result2.data.publishedAt) {
                    published.push(result2.data);
                } else {
                    unpublished.push(result2.data);
                }
            }
        }
        return {
            props: {
                user: result.data || null,
                published: published,
                unpublished: unpublished,
            },
        };
    }
    // No data means that the backend was not able to find a user from the session cookie.
    return {
        redirect: {
            destination: "/",
            permanent: false,
        },
    };
};

export default MyComicsPage;
