import React from "react";
import Form from "./form";
import Image from "next/image";
import Link from "next/link";
import { StyledLoginContainer, StyledAnchor } from "./styles";
import Box from "@mui/material/Box";

const Login: React.FC = () => {
    return (
        <StyledLoginContainer>
            <div style={{ width: "60%", paddingTop: 100 }}>
                <Link href="/">
                    <a>
                        <Image src="/zompdark.svg" alt="Zomp Icon" width={250} height={75} />
                    </a>
                </Link>
                <h1>Login to Your Account</h1>
                <Form />
            </div>
            <Box
                sx={{
                    width: "40%",
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    paddingTop: "150px",
                    fontSize: "2rem",
                    fontWeight: "bold",
                }}
            >
                <Link href="/">
                    <a>
                        <Image src="/zdark.svg" alt="Zomp Icon" width={150} height={150} />
                    </a>
                </Link>
                <div>
                    <p>Don&apos;t have an account?</p>
                    <Link href="/register" passHref>
                        <StyledAnchor>Sign up here.</StyledAnchor>
                    </Link>
                </div>
            </Box>
        </StyledLoginContainer>
    );
};

export default Login;
