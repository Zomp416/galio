import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";
import EditAccount from "../components/edit-account";
import { AuthProvider } from "../context/authcontext";
import { ImageProvider } from "../context/imagecontext";
import { getUserFromSession, getUserProfilePicture } from "../util/zileanUser";

interface Props {
    user: any;
    profilePicture: any;
}

const EditAccountPage: NextPage<Props> = props => {
    return (
        <>
            <Head>
                <title>Edit Account</title>
            </Head>
            <AuthProvider user={props.user}>
                <ImageProvider image={props.profilePicture}>
                    <Navbar domain="user" />
                    <EditAccount />
                </ImageProvider>
            </AuthProvider>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const result = await getUserFromSession(context.req.headers.cookie || "");
    if (result.data) {
        const result2 = await getUserProfilePicture(result.data._id);
        return {
            props: {
                user: result.data || null,
                profilePicture: result2.data.profilePicture || null,
            },
        };
    }
    return {
        redirect: {
            destination: "/",
            permanent: false,
        },
    };
};

export default EditAccountPage;
