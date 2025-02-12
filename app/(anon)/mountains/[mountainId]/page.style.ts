import styled from "styled-components";

export const PageContainer = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 16px;
    font-family: Arial, sans-serif;
`;

export const MountainHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
`;

export const MountainImageWrapper = styled.div`
    //width: 100%;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 16px;
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
    border-bottom: 2px solid #269386;
    display: inline-block;
`;

export const MapPlaceholder = styled.div`
    width: 100%;
    height: 200px;
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

export const CourseCard = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    background-color: #fff;

    h3 {
        font-size: 1.1rem;
        color: #269386;
        margin-bottom: 8px;
    }

    p {
        font-size: 0.9rem;
        color: #555;
        margin: 4px 0;
    }
`;
