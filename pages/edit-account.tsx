import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";
import EditAccount from "../components/edit-account";

const EditAccountPage: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Edit Account</title>
            </Head>
            <div
                style={{
                    width: "100%",
                    height: "50px",
                    backgroundColor: "#3F3F3F",
                    color: "white",
                }}
            >
                <Navbar domain="" />
                <EditAccount />
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    // Pass session cookie in request to backend
    // const data = await getUserFromSession(context.req.headers.cookie || "");

    // TODO get query params and pass in request to backend

    return {
        props: {},
    };
};

export default EditAccountPage;
