import styled from "styled-components";

// 🔹 전체 배경 (오버레이)
export const Overlay = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: ${({ $isOpen }) =>
        $isOpen ? "block" : "none"}; // 변경된 prop 사용
    z-index: 2000;
`;

// 🔹 Bottom Sheet 컨테이너
export const BottomSheet = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    max-height: 80%;
    background: white;
    border-radius: 20px 20px 0 0;
    padding: 16px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    transform: ${({ $isOpen }) =>
        $isOpen ? "translateY(0)" : "translateY(100%)"};
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
`;

// 🔹 헤더 (닫기 버튼 포함)
export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;

    h2 {
        font-size: 18px;
        font-weight: bold;
    }

    button {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
    }
`;

// 🔹 필터 내용 영역
export const Content = styled.div`
    padding: 16px 0;
    overflow-y: auto;
    max-height: 60vh;
`;

// 🔹 필터 그룹 (공통 스타일)
export const FilterGroup = styled.div`
    margin-bottom: 20px;

    h1 {
        font-size: 16px;
        margin-bottom: 10px;
    }

    div {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
`;

// 🔹 필터 버튼
export const FilterSelect = styled.span<{ selected: boolean }>`
    display: inline-block;
    padding: 10px 15px;
    border-radius: 100px;
    cursor: pointer;
    background-color: ${({ selected }) => (selected ? "#353535" : "#F2F2F2")};
    color: ${({ selected }) => (selected ? "#fff" : "#000")};
    transition: background-color 0.1s ease, color 0.1s ease;

    &:hover {
        background-color: ${({ selected }) =>
            selected ? "#353535" : "#f3f3f3"};
    }
`;

// 🔹 산 선택 드롭다운 스타일
export const Mountain = styled.div`
    margin-bottom: 20px;
    p {
        font-size: 16px;
        margin-bottom: 10px;
    }

    select {
        width: 100%;
        height: 40px;

        font-size: 16px;

        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: white;

        color: black;
        cursor: pointer;
    }
`;

// 🔹 버튼 그룹
export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 16px;

    button {
        flex: 1;
        padding: 18px;
        font-size: 16px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        margin: 0 4px;

        &:first-child {
            background: #f3f3f3;
            color: #000;
        }

        &:last-child {
            background: #353535;
            color: #fff;
        }
    }
`;
