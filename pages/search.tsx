import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";
import Search from "../components/search";

const SearchPage: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Zomp Search</title>
            </Head>
            <Navbar domain="comics" />
            <Search />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    // Pass session cookie in request to backend
    // const data = await getUserFromSession(context.req.headers.cookie || "");

    // TODO get query params and pass in request to backend

    return {
        props: {},
    };
};

export default SearchPage;
