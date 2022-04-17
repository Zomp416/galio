import React from "react";
import Details from "./details";
import Results from "./results";
import { Divider } from "@mui/material";
import * as Styled from "./styles";

const Profile: React.FC<{ user2?: any; userSubs?: any }> = ({ user2, userSubs }) => {
    return (
        <Styled.ZompOuter>
            <Styled.ZompInner>
                <Details user2={user2}></Details>
                <Results user2={user2} userSubs={userSubs}></Results>
            </Styled.ZompInner>
        </Styled.ZompOuter>
    );
};

export default Profile;
