import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";
import Search from "../components/search";
import { AuthProvider } from "../context/authcontext";
import { getUserFromSession } from "../util/zileanUser";
import { SearchProvider } from "../context/searchcontext";

interface Props {
    user: any;
}

const SearchPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>Zomp Search</title>
            </Head>
            <SearchProvider>
                <AuthProvider user={props.user}>
                    <Navbar domain="search" />
                    <Search />
                </AuthProvider>
            </SearchProvider>
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
