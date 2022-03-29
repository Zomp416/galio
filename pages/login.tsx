import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Login from "../components/login";
// import { getUserFromSession } from "../util/zilean";

const LoginPage: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Login to Zomp</title>
            </Head>
            <Login />
        </div>
    );
};

// export const getServerSideProps: GetServerSideProps = async context => {
//     // Pass session cookie in request to backend
//     const data = await getUserFromSession(context.req.headers.cookie || "");

//     // If there is an error, continue to login page
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
