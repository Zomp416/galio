import React from "react";
import Form from "./form";
import Image from "next/image";
import Link from "next/link";
import { StyledLoginContainer, StyledAnchor } from "./styles";
import Box from "@mui/material/Box";

const ForgotPassword: React.FC = () => {
    return (
        <StyledLoginContainer>
            <div style={{ width: "60%", paddingTop: 100 }}>
                <Image src="/zompdark.svg" alt="Zomp Icon" width={250} height={75} />
                <h1>Forgot Your Password?</h1>
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
                <Image src="/zdark.svg" alt="Zomp Icon" width={150} height={150} />
                <div>
                    {/* <p>Don&apos;t have an account?</p> */}
                    <Link href="/login" passHref>
                        <StyledAnchor>Login Instead</StyledAnchor>
                    </Link>
                </div>
            </Box>
        </StyledLoginContainer>
    );
};

export default ForgotPassword;
