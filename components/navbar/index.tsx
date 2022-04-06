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

const loggedIn = false; //TODO: replace once we connect with backend

const Navbar: React.FC<NavbarProps> = props => {
    //Used to enable the menu on the user icon
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    //Used to show the appropiate logo based on the page
    var logo;
    if (props.props == "comics") {
        logo = <Image src="/brushicon.svg" alt="Brush Icon" width={64} height={64} />;
    } else if (props.props == "stories") {
        logo = <Image src="/penicon.svg" alt="Brush Icon" width={64} height={64} />;
    } else {
        logo = "";
    }
    //Used to display the appropiate menu (Guest, LoggedInComics, LoggedInStories, PostLogin)
    //TODO: Decide how we want our menu to look; and if applicable, replace div with Menu
    var menu = (
        <div>
            <Link href="/login" passHref>
                <MenuItem>Log In</MenuItem>
            </Link>
            <Link href="/register" passHref>
                <MenuItem>Register</MenuItem>
            </Link>
        </div>
    );
    if (loggedIn) {
        if (props.props == "comics") {
            menu = (
                <div>
                    <MenuItem>Start New Comic</MenuItem>
                    <MenuItem>My Comics</MenuItem>
                    <MenuItem>My Profile</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem>Log Out</MenuItem>
                </div>
            );
        } else if (props.props == "stories") {
            menu = (
                <div>
                    <MenuItem>Start New Story</MenuItem>
                    <MenuItem>My Stories</MenuItem>
                    <MenuItem>My Profile</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem>Log Out</MenuItem>
                </div>
            );
        } else {
            menu = (
                <div>
                    <MenuItem>My Profile</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem>Log Out</MenuItem>
                </div>
            );
        }
    }

    return (
        <div style={{ width: "100%", backgroundColor: "#323232" }}>
            <Link href="/">
                <a>
                    <Image src="/zomplight.svg" alt="Zomp Icon" width={213} height={64} />
                    {logo}
                </a>
            </Link>
            {/* TODO: Update the UI of the search field */}
            <TextField
                id="filled-basic"
                label="Search ... "
                variant="filled"
                sx={{ input: { color: "#8F8F8F" } }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Box sx={{ width: "55px", backgroundColor: "#555555" }}>
                                {/* TODO: Make SearchIcon clickable and perform a search */}
                                <SearchIcon
                                    sx={{ marginLeft: "4px", fontSize: "48px", color: "#8F8F8F" }}
                                />
                            </Box>
                        </InputAdornment>
                    ),
                }}
            />
            {/* TODO: move icon up */}
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
                {menu}
            </Menu>
        </div>
    );
};

export default Navbar;
