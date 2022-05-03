import React from "react";
import Image from "next/image";
import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    InputBase,
    FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { useAuthContext } from "../../context/authcontext";
import { logout } from "../../util/zileanUser";
import { createComic } from "../../util/zileanComic";
import { createStory } from "../../util/zileanStory";
import { IMAGE_URI } from "../../util/config";

interface NavbarProps {
    domain: string;
}

interface NavbarLink {
    display: string;
    url?: string;
    onClick?: () => any;
}

const Navbar: React.FC<NavbarProps> = props => {
    //Get user context to determine if the user is logged in
    const { user } = useAuthContext();
    var loggedIn = user ? true : false;

    //Used to enable the menu on the user icon
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [search, setSearch] = React.useState("");
    const router = useRouter();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        await logout();
        router.push("/");
        setAnchorElUser(null);
    };

    //Used to retrieve the search field
    const handleSearch = (e: any) => {
        router.push(`/search?${search}`);
    };

    //Used to create comics
    const handleCreateComic = async () => {
        //event.preventDefault(); having event prevents it from being a input in onclick
        const data = await createComic();
        if (!data.error) {
            router.push({ pathname: "/comic/edit/" + data.data._id });
        }
    };

    //Used to create stories
    const handleCreateStory = async () => {
        //event.preventDefault(); having event prevents it from being a input in onclick
        const data = await createStory();
        if (!data.error) {
            router.push({ pathname: "/story/edit/" + data.data._id });
        }
    };

    const loggedInComicsSettings: NavbarLink[] = [
        { display: "Start New Comic", onClick: handleCreateComic },
        { display: "My Comics", url: "/comic/my" },
        { display: "Visit Stories", url: "/story/hub" },
        { display: "My Profile", url: "/user/" + (user ? user?.username : "N/A") },
        { display: "Account Settings", url: "/edit-account" },
        { display: "Log Out", onClick: handleLogout },
    ];
    const loggedInStoriesSettings: NavbarLink[] = [
        { display: "Start New Story", onClick: handleCreateStory },
        { display: "My Stories", url: "/story/my" },
        { display: "Visit Comics", url: "/comic/hub" },
        { display: "My Profile", url: "/user/" + (user ? user?.username : "N/A") },
        { display: "Account Settings", url: "/edit-account" },
        { display: "Log Out", onClick: handleLogout },
    ];
    const loggedInDefaultSettings: NavbarLink[] = [
        { display: "Visit Comics Hub", url: "/comic/hub" },
        { display: "Visit Stories Hub", url: "/story/hub" },
        { display: "My Profile", url: "/user/" + (user ? user?.username : "N/A") },
        { display: "Account Settings", url: "/edit-account" },
        { display: "Log Out", onClick: handleLogout },
    ];
    const loggedOutSettings: NavbarLink[] = [
        { display: "Log In", url: "/login" },
        { display: "Register", url: "/register" },
        { display: "Continue As Guest", url: "/guest" },
    ];

    //Used to show the appropiate logo based on the page
    var logo =
        props.domain == "comics" ? (
            <Image src="/brushicon.svg" alt="Brush Icon" width={40} height={40} />
        ) : props.domain == "stories" ? (
            <Image src="/penicon.svg" alt="Brush Icon" width={40} height={40} />
        ) : (
            ""
        );
    var link =
        props.domain == "comics" ? "comic/hub" : props.domain == "stories" ? "story/hub" : "";

    //Used to display the appropiate menu (Guest, LoggedInComics, LoggedInStories, PostLogin)
    var settings: NavbarLink[] = loggedIn
        ? props.domain == "comics"
            ? loggedInComicsSettings
            : props.domain == "stories"
            ? loggedInStoriesSettings
            : loggedInDefaultSettings
        : loggedOutSettings;

    return (
        <AppBar
            position="fixed"
            color="secondary"
            // NAVBAR HEIGHT IS CORRELATED TO MARGIN ON INDIVIDUAL PAGES
            sx={{
                height: "50px",
                display: "flex",
                flexDirection: "row",
                padding: "10px",
                gap: "10px",
                alignItems: "center",
            }}
        >
            <IconButton
                href={"/" + link}
                component="a"
                sx={{ flexGrow: 1, justifyContent: "left" }}
            >
                <Image src="/zomplight.svg" alt="Zomp Icon" width={100} height={40} />
                {logo}
            </IconButton>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <FormControl component="form" sx={{ position: "relative" }} onSubmit={handleSearch}>
                    <InputBase
                        id="search"
                        placeholder="Search"
                        sx={{
                            paddingLeft: "10px",
                            border: "1px solid gray",
                            color: "white",
                            width: "400px",
                        }}
                        name="search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <IconButton
                        component="button"
                        type="submit"
                        sx={{ position: "absolute", right: "0px", padding: "6px", zIndex: 100 }}
                        aria-label="search"
                        onClick={handleSearch}
                    >
                        <SearchIcon color="primary" />
                    </IconButton>
                </FormControl>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "right",
                }}
            >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar />
                </IconButton>
                <Menu
                    sx={{ mt: "40px" }}
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
                    {settings.map(setting => {
                        if (setting.url) {
                            return (
                                <MenuItem
                                    key={setting.display}
                                    component="a"
                                    href={setting.url}
                                    onClick={handleCloseUserMenu}
                                >
                                    {setting.display}
                                </MenuItem>
                            );
                        } else if (setting.onClick) {
                            return (
                                <MenuItem
                                    key={setting.display}
                                    component="a"
                                    onClick={setting.onClick}
                                >
                                    {setting.display}
                                </MenuItem>
                            );
                        }
                    })}
                </Menu>
            </Box>
        </AppBar>
    );
};

export default Navbar;
