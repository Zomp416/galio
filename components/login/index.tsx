import React from "react";
import Form from "./form";
import Image from "next/image";
import Link from "next/link";
import { StyledLoginContainer } from "./styles";

const Login: React.FC = () => {
    return (
        <StyledLoginContainer>
            <div style={{ width: "60%", paddingTop: 100 }}>
                <Image src="/zompdark.svg" alt="Zomp Icon" width={250} height={75} />
                <h1>Login to Your Account</h1>
                <Form />
            </div>
            <div style={{ width: "40%", backgroundColor: "#39a78e", paddingTop: 150 }}>
                {/* TODO REFACTOR AFTER IMPLEMETING REGISTER PAGE */}
                <Image src="/zdark.svg" alt="Zomp Icon" width={150} height={150} />
                <div>
                    <h2>Don&apos;t have an account?</h2>
                    <Link href="/api/hello">Sign up here.</Link>
                </div>
            </div>
        </StyledLoginContainer>
    );
};

export default Login;
