import styled from "styled-components";
import { Main } from "../../auth/setNickname/page.styles";

export const ProfileContainer = styled.div`
    padding: 8px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    height: 76px;

    :nth-child(1) {
        display: flex;
        align-items: center;
    }

    #nickname-container {
        div {
            display: flex;
            flex-direction: row;
            align-items: center;
            cursor: pointer;
        }
    }
`;

export const ProfileImage = styled.img`
    width: 55px;
    height: 55px;
    padding: 8px;
    border-radius: 50%;
    object-fit: cover;
`;
export const ArrowImage = styled.img``;
export const H4 = styled.h4`
    padding: 8px 16px;
    font-weight: bold;
    font-size: 16px;
    margin: 0;
`;

export const ProfileInfo = styled.p`
    padding: 8px 8px 8px 16px;
    font-size: 12px;
    color: #808080;
`;

export const ProfileMain = styled(Main)`
    justify-content: unset;
    align-items: unset;
    height: calc(95vh - 63px);
`;

export const ErrorMessage = styled.p`
    color: #ff0000;
    margin-top: 10px;
`;
