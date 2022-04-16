import type { NextPage } from "next";
import Head from "next/head";
import SendVerify from "../../components/verify/send-verify";

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

export default SendVerifyPage;
