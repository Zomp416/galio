import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";
import EditAccount from "../components/edit-account";
import { AuthProvider } from "../context/authcontext";
import { getUserFromSession } from "../util/zilean";

interface Props {
    user: any;
}

const EditAccountPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>Edit Account</title>
            </Head>
            <AuthProvider user={props.user}>
                <Navbar domain="user" />
                <EditAccount />
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

export default EditAccountPage;
