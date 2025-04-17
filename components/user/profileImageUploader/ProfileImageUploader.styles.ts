import styled from "styled-components";

export const ProfileImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 15vh;
    cursor: pointer;

    img {
        width: 90px;
        height: 90px;
        padding: 8px;
        border-radius: 50%;
        object-fit: cover;
    }

    h4 {
        color: #a5a5a5;
        padding: 8px;
        font-weight: 300;
        font-size: 14px;
    }
`;
