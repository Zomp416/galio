import React from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

interface NavbarProps {
    props: string;
}

const Navbar: React.FC<NavbarProps> = props => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    var logo;
    if (props.props == "comics") {
        logo = <Image src="/brushicon.svg" alt="Brush Icon" width={64} height={64} />;
    } else if (props.props == "stories") {
        logo = <Image src="/penicon.svg" alt="Brush Icon" width={64} height={64} />;
    } else {
        logo = "";
    }
    return (
        <div style={{ width: "100%", backgroundColor: "#323232" }}>
            <Link href="/">
                <a>
                    <Image src="/zomplight.svg" alt="Zomp Icon" width={213} height={64} />
                    {logo}
                </a>
            </Link>
            <TextField
                id="filled-basic"
                label="Search ... "
                variant="filled"
                sx={{ input: { color: "#8F8F8F" } }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Box sx={{ width: "55px", backgroundColor: "#555555" }}>
                                <SearchIcon
                                    sx={{ marginLeft: "4px", fontSize: "48px", color: "#8F8F8F" }}
                                />
                            </Box>
                        </InputAdornment>
                    ),
                }}
            />
            <IconButton onClick={handleClick}>
                <AccountCircleIcon sx={{ fontSize: "64px", color: "#BCECDC" }} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: "''",
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 30,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default Navbar;
