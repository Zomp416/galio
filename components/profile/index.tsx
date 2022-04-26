import React from "react";
import Details from "./details";
import Results from "./results";
import * as Styled from "./styles";

const Profile: React.FC<{ user2?: any; userSubs?: any; userProfile?: any }> = ({
    user2,
    userSubs,
    userProfile,
}) => {
    return (
        <Styled.ZompOuter>
            <Styled.ZompInner>
                <Details user2={user2} userProfile={userProfile}></Details>
                <Results user2={user2} userSubs={userSubs}></Results>
            </Styled.ZompInner>
        </Styled.ZompOuter>
    );
};

export default Profile;
