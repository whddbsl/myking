import styled from "styled-components";

export const FilterComponent = styled.div`
    padding: 0 16px;
    > div {
    }
`;

export const Mountain = styled.div`
    div {
        display: flex;
        align-items: center;
        padding: 7px 0;

        p {
            width: 120px;
        }

        select {
            width: 123px;
            padding: 7px;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: white;
            cursor: pointer;
        }
    }
`;

export const FilterSelect = styled.span<{ selected: boolean }>`
    display: inline-block;
    padding: 10px 15px;
    margin: 5px;
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
