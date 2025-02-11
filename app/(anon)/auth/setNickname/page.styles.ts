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
