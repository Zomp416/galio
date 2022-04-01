import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Verify from "../../../components/verify";

interface Props {
    status: boolean;
}

const VerifyPage: NextPage<Props> = props => {
    return (
        <div>
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
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    // const id = context.params?.id;
    // const token = context.params?.token;

    const status = true;

    // TODO return status of request to backend using request parameters
    return {
        props: {
            status,
        },
    };
};

export default VerifyPage;
