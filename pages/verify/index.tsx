import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Verify from "../../components/verify";

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
                    message="A Link to verify your email has been sent."
                    buttonLink="/"
                    buttonText="Go Home"
                />
            ) : (
                <Verify
                    message="There was an error attempting to send a link."
                    buttonLink="/"
                    buttonText="Go Home"
                />
            )}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const status = true;

    // TODO redirect if user is not logged in
    // TODO return status of request to backend using user session data
    return {
        props: {
            status,
        },
    };
};

export default VerifyPage;
