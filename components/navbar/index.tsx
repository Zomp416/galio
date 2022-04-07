import React from "react";
import Image from "next/image";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";

interface NavbarProps {
    domain: string;
}

const loggedIn = false; //TODO: replace once we connect with backend

const loggedInComicsSettings = [
    { display: "Start New Comic", url: "/" },
    { display: "My Comics", url: "/" },
    { display: "My Profile", url: "/" },
    { display: "Account Settings", url: "/" },
    { display: "Log Out", url: "/" },
];
const loggedInStoriesSettings = [
    { display: "Start New Story", url: "/" },
    { display: "My Stories", url: "/" },
    { display: "My Profile", url: "/" },
    { display: "Account Settings", url: "/" },
    { display: "Log Out", url: "/" },
];
const loggedInDefaultSettings = [
    { display: "My Profile", url: "/" },
    { display: "Account Settings", url: "/" },
    { display: "Log Out", url: "/" },
];
const loggedOutSettings = [
    { display: "Log In", url: "/login" },
    { display: "Register", url: "/register" },
];

const Navbar: React.FC<NavbarProps> = props => {
    //Used to enable the menu on the user icon
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    //Used to show the appropiate logo based on the page
    var logo =
        props.domain == "comics" ? (
            <Image src="/brushicon.svg" alt="Brush Icon" width={64} height={64} />
        ) : props.domain == "stories" ? (
            <Image src="/penicon.svg" alt="Brush Icon" width={64} height={64} />
        ) : (
            ""
        );
    //Used to display the appropiate menu (Guest, LoggedInComics, LoggedInStories, PostLogin)
    var settings = loggedIn
        ? props.domain == "comics"
            ? loggedInComicsSettings
            : props.domain == "stories"
            ? loggedInStoriesSettings
            : loggedInDefaultSettings
        : loggedOutSettings;

    return (
        <AppBar position="static" color="secondary">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
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
                                    <Box
                                        component="a"
                                        href="/search"
                                        sx={{
                                            width: "55px",
                                            backgroundColor: "#555555",
                                            marginRight: "-12px",
                                        }}
                                    >
                                        {/* TODO: Make SearchIcon clickable and perform a search */}
                                        <SearchIcon
                                            sx={{
                                                paddingTop: "5px",
                                                paddingLeft: "9px",
                                                fontSize: "48px",
                                                color: "#8F8F8F",
                                            }}
                                        />
                                    </Box>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <AccountCircleIcon sx={{ fontSize: "64px", color: "#BCECDC" }} />
                        </IconButton>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map(setting => (
                                <MenuItem
                                    key={setting.display}
                                    component="a"
                                    href={setting.url}
                                    onClick={handleCloseUserMenu}
                                >
                                    {setting.display}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
