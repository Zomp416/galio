import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import Navbar from "../components/navbar";
import { AuthProvider } from "../context/authcontext";
import { Typography } from "@mui/material";

const NotFound: NextPage = () => {
    return (
        <>
            <Head>
                <title>Internal Server Error - Zomp</title>
            </Head>
            <AuthProvider>
                <Navbar domain="home" />
                <Typography sx={{ marginTop: "300px" }} variant="h2" textAlign="center">
                    An error occurred. Please try again.
                </Typography>
                <Typography sx={{ marginTop: "30px" }} variant="h5" textAlign="center">
                    <Link href="/" passHref>
                        <a>Go Home</a>
                    </Link>
                </Typography>
            </AuthProvider>
        </>
    );
};

export default NotFound;
