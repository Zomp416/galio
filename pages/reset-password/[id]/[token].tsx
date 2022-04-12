import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import ResetPassword from "../../../components/reset-password";
import { Button, Typography } from "@mui/material";

interface Props {
    status: boolean;
}

const VerifyPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>Reset Your Password</title>
            </Head>
            {props.status ? (
                <ResetPassword />
            ) : (
                <>
                    <Typography gutterBottom variant="h3" sx={{ marginTop: "50px" }}>
                        Reset link is invalid or expired!
                    </Typography>
                    <Button
                        component="a"
                        href="/forgot-password"
                        variant="contained"
                        color="primary"
                        sx={{ fontSize: "1.25rem", width: "25%" }}
                    >
                        Send another link
                    </Button>
                </>
            )}
        </>
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
