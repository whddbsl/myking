import styled from "styled-components";

export const PageContainer = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 16px 16px 80px; /* 상하좌우 순서: 상단 16px, 좌우 16px, 하단 80px */
`;
export const MountainHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
`;

// MountainImageWrapper를 100% 너비로 설정하고, 원하는 비율(예: 4:3)을 유지합니다.
export const MountainImageWrapper = styled.div`
    position: relative;
    width: 100%;
    border-radius: 15px;
    overflow: hidden;
    margin-bottom: 16px;
    aspect-ratio: 4 / 3; /* 필요에 따라 조정 */
`;

export const MountainTitle = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin: 0;
`;

export const MountainSubtitle = styled.p`
    font-size: 0.875rem;
    color: #666;
    text-align: center;
    margin: 8px 0 0;
`;

export const MountainInfo = styled.p`
    font-size: 1rem;
    line-height: 1.5;
    color: #333;
    margin-bottom: 24px;
`;

export const SectionTitle = styled.h2`
    font-size: 1.25rem;
    font-weight: bold;
    margin: 24px 0 16px;
    border-bottom: 3px solid #269386;
    display: inline-block;
`;

export const MapPlaceholder = styled.div`
    width: 100%;
    height: 310px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #888;
    font-size: 1rem;
    border-radius: 8px;
    margin-bottom: 24px;
`;

export const CourseList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

// CourseCard: 상단에 좌측 정보와 우측 이미지, 하단에 설명 영역 배치
export const CourseCard = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    background-color: #fff;

    .course-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .course-info {
        flex: 1;
    }

    .course-info h3 {
        font-size: 1.1rem;
        color: #269386;
        margin-bottom: 15px;
    }

    .course-info p {
        font-size: 0.9rem;
        color: #555;
        margin: 4px 0;
        line-height: 120%;
    }

    .course-image {
        flex-shrink: 0;
        margin-left: 16px;
    }

    .course-description {
        margin-top: 12px;
        font-size: 0.9rem;
        color: #555;
        line-height: 140%;
    }
`;
