import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Register from "../components/register";
// import { getUserFromSession } from "../util/zilean";

const LoginPage: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Create a Zomp Account</title>
            </Head>
            <Register />
        </div>
    );
};

// export const getServerSideProps: GetServerSideProps = async context => {
//     // Pass session cookie in request to backend
//     const data = await getUserFromSession(context.req.headers.cookie || "");

//     // If there is an error, continue to register page
//     if (!data || data.error) {
//         return {
//             props: {},
//         };
//     }
//     // No error means that the backend was able to retrieve the user from the session cookie.
//     // TODO Redirect to better destination
//     return {
//         redirect: {
//             destination: "/",
//             permanent: false,
//         },
//     };
// };

export default LoginPage;
