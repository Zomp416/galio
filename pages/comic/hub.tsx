import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Hub from "../../components/comic/hub";
import Navbar from "../../components/navbar";
import { AuthProvider } from "../../context/authcontext";
import { getUserFromSession } from "../../util/zilean";

interface Props {
    user: any;
}

const HubPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>Community Hub</title>
            </Head>
            <AuthProvider user={props.user}>
                <Navbar domain="comics" />
                <Hub />
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
export default HubPage;
