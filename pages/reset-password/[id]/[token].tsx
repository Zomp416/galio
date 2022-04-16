import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import ResetPassword from "../../../components/reset-password";
import { sendIdAndToken } from "../../../util/zilean";

interface Props {
    message?: string;
    id: string;
    token: string;
}

const VerifyPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>Reset Your Password</title>
            </Head>
            <ResetPassword id={props.id} token={props.token} message={props.message} />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const id = context.params?.id;
    const token = context.params?.token;
    let message = "";
    if (id && token) {
        const res = await sendIdAndToken("reset-password-verify", {
            id: id as string,
            token: token as string,
        });
        if (res.error) {
            message = "Link is invalid or expired!";
        }
    }

    return {
        props: {
            message,
            id,
            token,
        },
    };
};

export default VerifyPage;
