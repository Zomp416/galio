import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StyledLoginContainer } from "./styles";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";

interface Props {
    message: string;
    buttonText: string;
    buttonLink: string;
}

const Verify: React.FC<Props> = props => {
    return (
        <StyledLoginContainer>
            <div style={{ width: "60%", paddingTop: 100 }}>
                <Link href="/">
                    <a>
                        <Image src="/zompdark.svg" alt="Zomp Icon" width={250} height={75} />
                    </a>
                </Link>
                <Typography gutterBottom variant="h3" sx={{ marginTop: "50px" }}>
                    {props.message}
                </Typography>
                <Button
                    component="a"
                    href={props.buttonLink}
                    variant="contained"
                    color="primary"
                    sx={{ fontSize: "1.25rem", width: "25%" }}
                >
                    {props.buttonText}
                </Button>
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
                </div>
            </Box>
        </StyledLoginContainer>
    );
};

export default Verify;
