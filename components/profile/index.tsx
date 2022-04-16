import React from "react";
import Details from "./details";
import Results from "./results";
import { Divider } from "@mui/material";
import * as Styled from "./styles";

const Profile: React.FC<{ user2?: any; userSubs?: any }> = ({ user2, userSubs }) => {
    return (
        <Styled.UserContainer>
            <Details user2={user2} userSubs={userSubs}></Details>
            <Divider sx={{ width: "100%", marginBottom: "20px" }} />
            <Results user2={user2} userSubs={userSubs}></Results>
        </Styled.UserContainer>
    );
};

export default Profile;
