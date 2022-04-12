import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";
import Search from "../components/search";
import { AuthProvider } from "../context/authcontext";
import { getUserFromSession } from "../util/zilean";

interface Props {
    user: any;
}

const SearchPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>Zomp Search</title>
            </Head>
            {/* TODO: dynamically set navbar with passing props to search page*/}

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
