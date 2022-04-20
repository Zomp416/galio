import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";
import EditAccount from "../components/edit-account";
import { AuthProvider } from "../context/authcontext";
import { ImageProvider } from "../context/imagecontext";
import { getUserFromSession, getImage } from "../util/zilean";

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
//LOOK INTO MONGOOSE POPULATE!!
export const getServerSideProps: GetServerSideProps = async context => {
    const result = await getUserFromSession(context.req.headers.cookie || "");
    const result2 =
        result.data.profilePicture !== undefined
            ? await (
                  await getImage(result.data.profilePicture)
              ).data
            : "";

    return {
        props: {
            user: result.data || null,
            profilePicture: result2 || null,
        },
    };
};

export default EditAccountPage;
