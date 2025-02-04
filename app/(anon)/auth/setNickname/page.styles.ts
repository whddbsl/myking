import styled from "styled-components";

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

    img {
        width: 90px;
        height: 90px;
        padding: 8px;
    }

    h4 {
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

    h5 {
        & > span {
            color: #de4d4d;
        }
    }

    input {
        outline: none;
        border: none;
        border-bottom: 1px solid #bfbfbf;
        border-radius: 0;
        width: 100%;
        padding: 16px 0;
        font-size: 15px;
    }
`;
