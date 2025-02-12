import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

export const Form = styled.form`
    margin-bottom: 100px;
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-bottom: 5rem;
`;

export const DescArea = styled.textarea`
    background: #f9f9f9;
    border: none;
    border-radius: 10px;

    margin: 16px 0;
    padding: 10px;

    width: 100%;
    line-height: 150%;
`;
export const Schedule = styled.div`
    margin: 10px;

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
export const DateInput = styled.input.attrs({ type: "date" })`
    appearance: none;
    width: 123px;
    padding: 7px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: white;
    cursor: pointer;

    &::-webkit-calendar-picker-indicator {
        filter: invert(0.5);
        cursor: pointer;
    }
`;

export const Filter = styled.div`
    border: 1px solid #efefef;
    border-radius: 12px;
    padding: 16px;
    margin: 10px 0;

    > div {
        margin-bottom: 15px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    h1 {
        margin-bottom: 10px;
    }
`;
export const MaxMemberCounter = styled.div`
    display: inline-block;

    border: 3px solid #f2f2f2;
    background-color: #f2f2f2;

    border-radius: 7px;

    button {
        font-size: 17px;
        width: 27px;
        height: 28px;
        border: none;
    }

    input {
        width: 35px;
        height: 28px;

        text-align: center;
        border: none;
        border-radius: 7px;
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

export const SubmitButton = styled.div`
    width: 100%;
    padding: 16px;

    position: fixed;
    bottom: 0;
    left: 0;

    background: #fff;
    border-top: 1px solid #f2f2f2;

    button {
        width: 100%;
        padding: 15px;

        background-color: #269386;
        border: none;
        border-radius: 10px;

        font-size: 17px;
        color: #fff;

        &:disabled {
            background-color: #b0b0b0;
            cursor: not-allowed;
        }
    }
`;
