import styled from "styled-components";

export const Container = styled.main`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
    background-color: #ffffff;
    flex-direction: column;
    padding: 16px;
`;

export const LogoContainer = styled.div`
    display: flex;
    margin-top: 32vh;
    flex-direction: column;

    h4 {
        color: #5d7370;
        font-weight: bold;
        align-self: flex-end;
        margin-bottom: 9px;
    }

    img {
        width: 250px;
        height: auto;
    }
`;

export const KakaoButton = styled.button`
    background-color: #fee500;
    color: #000000;
    font-weight: 600;
    border: none;
    border-radius: 12px;
    padding: 16px 120px;
    cursor: pointer;
    margin-bottom: 96px;
`;
