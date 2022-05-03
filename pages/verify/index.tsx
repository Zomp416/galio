import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import SendVerify from "../../components/verify/send-verify";
import { getUserFromSession } from "../../util/zileanUser";

const SendVerifyPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Verify Your Email</title>
            </Head>
            <SendVerify />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const result = await getUserFromSession(context.req.headers.cookie || "");

    if (result.data) {
        if (!result.data.verified) {
            //only unverified users
            return {
                props: {},
            };
        }
    }

    // No error means that the backend was able to retrieve the user from the session cookie.
    return {
        redirect: {
            destination: "/",
            permanent: false,
        },
    };
};

export default SendVerifyPage;
