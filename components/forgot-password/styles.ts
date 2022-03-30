import styled from "@emotion/styled";

export const StyledForm = styled.form`
    width: 60%;
    height: 150px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

export const StyledLoginContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    height: 100vh;
`;

export const StyledAnchor = styled.a`
    &:visited {
        color: inherit;
    }
    &:hover {
        color: black;
    }
`;
