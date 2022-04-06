import React from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

interface NavbarProps {
    props: string;
}

const Navbar: React.FC<NavbarProps> = props => {
    return (
        <div style={{ width: "100%", backgroundColor: "#3F3F3F" }}>
            <Link href="/">
                <a>
                    <Image src="/zomplight.svg" alt="Zomp Icon" width={250} height={75} />
                </a>
            </Link>
            {props.props}
            <TextField id="filled-basic" label="Search ... " variant="filled" />
            <SearchIcon></SearchIcon>
        </div>
    );
};

export default Navbar;
