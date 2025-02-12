import styled from "styled-components";
import Link from "next/link";
export const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #269386;
    padding-bottom: 63px;
`;

export const ErrorMessage = styled.div`
    color: red;
    margin-bottom: 1rem;
    font-weight: bold;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: white;
`;

export const Logo = styled.img`
    width: 120px;
    height: auto;
`;

export const SearchBanner = styled.section`
    background-color: #269386;
    padding: 2rem 1rem;
    text-align: center;
    border-radius: 20px 20px 0 0;
`;

export const BannerTitle = styled.h2`
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #fff;
`;

// 검색바 감싸는 래퍼
export const SearchBarWrapper = styled.div`
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 32px;
    padding: 0.5rem 1rem;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    border: 2.5px solid #ddd;
    transition: border-color 0.3s ease;

    &:hover {
        border-color: #207d73;
    }
`;

// 검색 입력 필드
export const SearchInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 1rem;
    padding: 0.5rem 0; /* 상하 간격 조정 */
    color: #333;

    &::placeholder {
        color: #aaa;
    }
`;
// 검색 아이콘 감싸는 래퍼
export const SearchIconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background-image: url("/images/searchIcon.svg");
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
`;
export const MainSection = styled.main`
    flex: 1;
    padding: 1.5rem;
    width: 100%;
    margin: 0 auto;
    border-radius: 20px 20px 0 0;
    background-color: white;
`;

export const SectionTitle = styled.h3`
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
    font-weight: bold;
`;

export const SectionSubtitle = styled.p`
    color: #666;
    margin-bottom: 1rem;
`;

export const MountainCarousel = styled.div`
    display: flex;
    gap: 1rem;

    /* snap 사용 시 자동 스크롤이 필요하므로 auto로 변경 */
    overflow-x: auto;

    /* 스크롤 스냅 관련 설정 */
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth; /* 드래그 후 놓았을 때 부드럽게 스크롤 */

    padding-bottom: 1rem;
    user-select: none;
    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; /* IE 및 Edge용 */
    scrollbar-width: none; /* Firefox용 */
    /* 각 카드가 스냅에 맞춰서 정렬되도록 */
    & > * {
        scroll-snap-align: start; /* 카드의 시작 지점이 스냅 */
    }
`;

export const MountainCard = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    min-width: 360px; /* 420px에서 360px로 줄임 */
    @media (max-width: 768px) {
        flex-direction: column;
        min-width: 360px;
        max-width: 480px; /* 필요에 따라 조정 */
    }
`;

export const MountainInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
`;

export const MountainImage = styled.div`
    flex: 0 0 40%;
    background-size: cover;
    background-position: center;
    min-height: 200px;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const MountainRegion = styled.div`
    font-size: 0.875rem;
    color: #888;
`;

export const MountainName = styled.h4`
    font-size: 1.2rem;
    margin: 0.25rem 0;
`;

export const MountainHashtags = styled.div`
    color: #269386;
    font-size: 0.9rem;
    margin-bottom: 1rem;
`;

export const CourseList = styled.div``;

export const CourseItem = styled.div`
    border: 1px solid #eee;
    padding: 0.5rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;

    .course-name {
        font-weight: bold;
    }
`;

export const CourseDetailContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    color: #666;
`;

interface DifficultySpanProps {
    difficulty: string;
}

export const DifficultySpan = styled.span<DifficultySpanProps>`
    color: ${({ difficulty }) => {
        switch (difficulty) {
            case "상급":
                return "#e74c3c"; // 빨간색
            case "중급":
                return "#f39c12"; // 주황색
            case "초급":
                return "#8fcf7d"; // 연두색
            default:
                return "#000"; // 기본 검정색
        }
    }};
`;

export const PopularBadge = styled.span`
    background-color: #8bc34a;
    color: white;
    font-size: 0.75rem;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    margin-left: auto;
`;

export const DetailLink = styled(Link)`
    display: block;
    width: 100%;
    margin-top: auto;
    padding: 0.75rem 0;
    background-color: #269386;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-weight: 500;
    text-decoration: none;

    &:hover {
        background-color: #1f7b6d;
    }
`;

export const MateSectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h2 {
        margin: 0;
        font-size: 1.25rem;
        margin-bottom: 0.25rem;
        font-weight: bold;
    }
`;

export const MateGrid = styled.div`
    display: grid;
    /* 2열 레이아웃 */
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    /* 만약 화면이 작을 때 1열로 줄이고 싶다면 반응형 미디어 쿼리 추가
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
    */
`;

export const MateCard = styled.div`
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    cursor: pointer; /* 클릭 가능하도록 변경 */

    .mountain {
        font-size: 1.1rem; /* 산 이름 크기 증가 */
        color: #269386;
        font-weight: bold;
        display: flex;
        align-items: center; /* 아이콘과 텍스트 수직 정렬 */

        &::before {
            content: "";
            display: inline-block;
            width: 16px; /* 아이콘 너비 */
            height: 16px; /* 아이콘 높이 */
            margin-right: 6px; /* 아이콘과 텍스트 간격 */
            background-image: url("/images/locationIcon.svg");
            background-size: contain;
            background-repeat: no-repeat;
        }
    }

    .description {
        font-size: 0.85rem; /* 설명 글씨 크기 감소 */
        margin: 8px 0;
        color: #333;
    }

    .club-info {
        font-size: 0.875rem;
        color: #888;
    }

    /* hover 효과 추가 */
    &:hover {
        border-color: #269386; /* 메인 테마 색으로 변경 */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 살짝 그림자 추가 */
        transition: border-color 0.3s ease, box-shadow 0.3s ease; /* 부드러운 전환 */
    }
`;

export const MateMoreLink = styled.span`
    color: #888;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
        color: #269386; /* hover 시 색상 변경 */
    }
`;

export const Footer = styled.footer`
    background-color: #333;
    color: #fff;
    padding: 1rem;
    font-size: 0.875rem;
    line-height: 1.4;

    div + div {
        margin-top: 0.25rem;
    }
`;
