import React from "react";
import Form from "./form";
import Image from "next/image";
import Link from "next/link";
import { StyledRegisterContainer, StyledAnchor } from "./styles";
import Box from "@mui/material/Box";

const Register: React.FC = () => {
    return (
        <StyledRegisterContainer>
            <div style={{ width: "60%", paddingTop: 100 }}>
                <Image src="/zompdark.svg" alt="Zomp Icon" width={250} height={75} />
                <h1>Create a Zomp Account</h1>
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
                    <p>Already have an account?</p>
                    <Link href="/login" passHref>
                        <StyledAnchor>Login here.</StyledAnchor>
                    </Link>
                </div>
            </Box>
        </StyledRegisterContainer>
    );
};

export default Register;
