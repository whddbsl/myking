import styled from "styled-components";
import Link from "next/link";

interface StateProps {
    state: "모집중" | "마감"; // 상태 값의 타입 정의
}

export const FilterContainer = styled.div`
    padding: 16px;
    display: flex;
    align-items: center;
    span {
        margin-left: 5px;
    }
`;

export const FilterButton = styled.button`
    margin-right: 14px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    font-size: 16px;
    color: #333;
    background-color: white;

    border: none;
    border-radius: 8px;

    width: 100px;

    cursor: pointer;
    transition: background 0.2s ease-in-out;
`;

export const FilterTagContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    gap: 8px;
    overflow-x: auto;
    white-space: nowrap;

    /* 스크롤바 숨기기 */
    -ms-overflow-style: none; /* IE, Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari */
    }
`;

export const FilterTag = styled.div`
    background-color: #f1f3f5;
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 14px;
    color: #333;
    flex-shrink: 0; /* 요소 크기 축소 방지 */
`;

export const Cards = styled.div`
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 10rem;
`;
export const Card = styled.div`
    border: 1px solid #eaeaea;
    border-radius: 20px;
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
    padding: 0 15px 15px;
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
export const Tag = styled.div`
    display: flex;
    gap: 3px;
    margin-bottom: 10px;
`;
export const Footer = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-top: 1px solid #eaeaea;

    padding: 15px;
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
export const State = styled.p<StateProps>`
    background-color: ${(props) =>
        props.state === "모집중" ? "#269386" : "#b0b0b0"};
    border-radius: 100px;

    padding: 13px;
    color: #fff;
`;

export const LinkWrapper = styled(Link)`
    text-decoration: none; /* 밑줄 제거 */
    color: inherit;
    font-size: 16px;
`;

export const CreateButton = styled(Link)`
    position: fixed; /* 화면 내 고정 */
    bottom: 80px; /* 화면 아래에서 20px */
    left: 50%; /* 화면 오른쪽에서 20px */
    transform: translateX(-50%);
    z-index: 1000; /* 다른 요소보다 앞에 배치 */

    padding: 14px 24px; /* 버튼 크기 */

    background-color: #444; /* 버튼 배경색 */
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.25); /* 그림자 효과 */
    border-radius: 100px; /* 둥근 모서리 */

    color: #efefef; /* 텍스트 색상 */
    font-size: 16px;
    text-decoration: none;
`;

export const ActionButtons = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: auto;

    button {
        border: none;
        background-color: transparent;
        cursor: pointer;
    }
`;

export const NoPartyMessage = styled.div`
    margin: 20px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #888;
`;
