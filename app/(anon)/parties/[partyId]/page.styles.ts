import styled from "styled-components";

export const PartyDetailComponent = styled.div`
    height: 100vh;
    background-color: #fff;

    display: flex;
    flex-direction: column;
    gap: 12px;
`;
export const Card = styled.div`
    background-color: #fff;
    border-bottom: 12px solid #efefef;
`;

export const ProfileSection = styled.div`
    display: flex;
    gap: 10px;
    padding: 15px;
`;
export const ProfileImageWrap = styled.div`
    width: 36px;
    height: 36px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;
    overflow: hidden;
`;
export const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: #ddd;
`;
export const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    h1 {
        font-size: 15px;
        font-weight: bold;
    }
    h2 {
        font-size: 13px;
        color: #a6a6a6;
    }
`;
export const InfoSection = styled.div`
    padding: 0 16px 16px;
`;
export const Meeting = styled.div`
    height: 30px;
    display: inline-flex;
    align-items: center;
    gap: 12px; /* 텍스트와 구분선 간격 */
    border: 1px solid #eee;
    border-radius: 20px;
    background-color: #fff;

    font-size: 14px;
    color: #888;

    margin-bottom: 15px;
    padding: 0 13px;
    position: relative; /* 가상 요소를 위한 상대 위치 */

    span {
        &:first-child {
            position: relative;
            &::after {
                content: ""; /* 가상 요소 */
                display: block;
                width: 1px; /* 구분선 두께 */
                height: 30px; /* 구분선 높이 */
                background-color: #eee; /* 구분선 색상 */
                position: absolute;
                top: 50%;
                right: -7px; /* 텍스트와 구분선 간격 조정 */
                transform: translateY(-50%); /* 수직 가운데 정렬 */
            }
        }
    }
`;
export const Description = styled.pre`
    margin: 10px 0 25px;
`;
export const Tag = styled.div`
    display: flex;
    gap: 3px;
    margin-bottom: 10px;
    color: #555555;
`;
export const Footer = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-top: 1px solid #eaeaea;

    padding: 16px;
`;
export const EndDate = styled.div`
    h1 {
        font-size: 13px;
    }
    h2 {
        font-size: 17px;
        margin-top: 5px;
    }
`;
export const Paticipation = styled.button`
    display: flex;
    gap: 7px;
    background-color: #269386;
    color: #fff;
    padding: 15px;
    border-radius: 10px;
    border: none;

    &:disabled {
        background-color: #b0b0b0;
        cursor: not-allowed;
    }
`;
export const MemberInfo = styled.div`
    background-color: #fff;
    padding: 15px;

    h1 {
        font-size: 14px;
        color: #7f7f7f;
    }
    div {
        line-height: 160%;
        color: #7f7f7f;
        text-align: center;
        padding: 30px;
    }
`;
