import styled from "styled-components";

export const Header = styled.header`
    height: 5vh;
    padding: 0 16px;
    display: flex;
    align-items: center;

    & > img {
        height: 60%;
        width: auto;
    }
`;

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 95vh;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const ProfileImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 15vh;

    & > img {
        width: 90px;
        height: 90px;
        padding: 8px;
    }

    & > h4 {
        color: #a5a5a5;
        padding: 8px;
        font-weight: 300;
        font-size: 14px;
    }
`;

export const NicknameContainer = styled.div`
    font-size: 14px;
    color: #808080;
    align-self: stretch;
    margin: 48px 0;

    & > h5 {
        & > span {
            color: #de4d4d;
        }
    }

    & > input {
        outline: none;
        border: none;
        border-bottom: 1px solid #bfbfbf;
        width: 100%;
        padding: 16px 0;
    }
`;

export const SignUpButton = styled.button`
    background-color: #269386;
    color: #ffffff;
    border: none;
    padding: 16px 120px;
    width: 100%;
    border-radius: 12px;
    outline: none;
    cursor: pointer;
    font-weight: 400;
    font-size: 16px;
    margin-top: auto;
`;
