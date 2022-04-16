import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Verify from "../../../components/verify";
import { sendIdAndToken } from "../../../util/zilean";

interface Props {
    status: boolean;
}

const VerifyPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>Verify Zomp Account</title>
            </Head>
            {props.status ? (
                <Verify
                    message="Thank you for verifying your email!"
                    buttonLink="/"
                    buttonText="Go Home"
                />
            ) : (
                <Verify
                    message="Verification link is invalid or expired!"
                    buttonLink="/verify"
                    buttonText="Send Another Link"
                />
            )}
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const id = context.params?.id;
    const token = context.params?.token;
    let status = false;
    if (id && token) {
        const res = await sendIdAndToken("verify", {
            id: id as string,
            token: token as string,
        });
        if (!res.error) {
            status = true;
        }
    }

    return {
        props: {
            status,
        },
    };
};

export default VerifyPage;
