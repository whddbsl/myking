import styled from "styled-components";
import Link from "next/link";
export const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #269386;
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
    overflow-x: hidden;
    padding-bottom: 1rem;
    user-select: none;
`;

export const MountainCard = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    min-width: 420px;

    @media (max-width: 768px) {
        flex-direction: column;
        min-width: 420px;
        max-width: 500px;
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
    /* 카드 형태 */
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    background-color: #fff;
    /* 원하는 대로 스타일 조정 */
    display: flex;
    flex-direction: column;
    gap: 8px;

    .description {
        margin: 8px 0;
        /* 중앙 정렬 등 원하면 추가 */
        text-align: center;
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
