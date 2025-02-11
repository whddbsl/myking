// Home.styled.js
import styled from "styled-components";

export const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

/* ---------------- 헤더 ----------------- */
export const Header = styled.header`
    display: flex;
    align-items: center;
    padding: 1rem;
`;

export const Logo = styled.img`
    width: 120px;
    height: auto;
`;

/* ---------------- 검색 배너 ----------------- */
export const SearchBanner = styled.section`
    background-color: #269386;
    padding: 2rem 1rem;
    text-align: center;
`;

export const BannerTitle = styled.h2`
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #fff;
`;

export const SearchBarWrapper = styled.div`
    display: inline-flex;
    max-width: 600px;
    width: 100%;
    border-radius: 32px;
    background-color: #fff;
    padding: 0.75rem 1rem;
    align-items: center;
    cursor: pointer;
    border: 2.5px solid #ddd;
    transition: border-color 0.3s ease;

    &:hover {
        border-color: #207d73;
    }
`;

export const SearchInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    cursor: pointer;
`;

/* ---------------- 메인 섹션 ----------------- */
export const MainSection = styled.main`
    flex: 1;
    padding: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
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

/* -------- 산 & 코스 대표 카드 -------- */
export const MountainCard = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const MountainImage = styled.div`
    flex: 0 0 40%;
    background-image: url("/images/sample_mountain.jpg");
    background-size: cover;
    background-position: center;
    min-height: 200px;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const MountainInfo = styled.div`
    flex: 1;
    padding: 1rem;
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

export const CourseList = styled.div`
    margin-top: 1rem;
`;

export const CourseItem = styled.div`
    border: 1px solid #eee;
    padding: 0.5rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    .course-name {
        font-weight: bold;
    }
    .course-detail {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.875rem;
        color: #666;
        .difficulty {
            color: #e74c3c;
        }
        .divider {
            color: #999;
        }
    }
`;

export const DetailLink = styled.a`
    display: inline-block;
    margin-top: 1rem;
    color: #269386;
    cursor: pointer;
    font-weight: 500;
    &:hover {
        text-decoration: underline;
    }
`;

/* -------- 등산 메이트 모집 -------- */
export const MateSectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    h2 {
        font-size: 1.1rem;
        margin: 0;
    }
`;

export const MateMoreLink = styled.span`
    color: #888;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

export const MateGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
`;

export const MateCard = styled.div`
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 1rem;
    background-color: #fafafa;

    .mountain {
        color: #269386;
        font-weight: bold;
    }
    p {
        margin: 0.5rem 0;
    }
    .club-info {
        color: #666;
        font-size: 0.875rem;
    }
`;

/* ---------------- 푸터 ----------------- */
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
