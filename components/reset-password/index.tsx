import React from "react";
import Form from "./form";
import Image from "next/image";
import Link from "next/link";
import { StyledLoginContainer, StyledAnchor } from "./styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface Props {
    id: string;
    token: string;
    message?: string;
}

const ResetPassword: React.FC<Props> = props => {
    return (
        <StyledLoginContainer>
            <div style={{ width: "60%", paddingTop: 100 }}>
                <Link href="/">
                    <a>
                        <Image src="/zompdark.svg" alt="Zomp Icon" width={250} height={75} />
                    </a>
                </Link>
                <h1>Reset Your Password</h1>
                {props.message ? (
                    <>
                        <Typography gutterBottom variant="h3" sx={{ marginTop: "50px" }}>
                            {props.message}
                        </Typography>
                        <Button
                            component="a"
                            href="/forgot-password"
                            variant="contained"
                            color="primary"
                            sx={{ fontSize: "1.25rem", width: "50%" }}
                        >
                            Generate New Link
                        </Button>
                    </>
                ) : (
                    <Form id={props.id} token={props.token} />
                )}
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
                    <p>Zomp</p>
                    <Link href="/login" passHref>
                        <StyledAnchor>Login Instead</StyledAnchor>
                    </Link>
                </div>
            </Box>
        </StyledLoginContainer>
    );
};

export default ResetPassword;
