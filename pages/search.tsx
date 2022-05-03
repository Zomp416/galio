import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";
import Search from "../components/search";
import { AuthProvider } from "../context/authcontext";
import { getUserFromSession } from "../util/zileanUser";

interface Props {
    user: any;
}

//TODO: change url of page to be /search/[params], so we can pass searchBy result in navbar

const SearchPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>Zomp Search</title>
            </Head>

            <AuthProvider user={props.user}>
                <Navbar domain="search" />
                <Search />
            </AuthProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const result = await getUserFromSession(context.req.headers.cookie || "");

    return {
        props: {
            user: result.data || null,
        },
    };
};

export default SearchPage;
