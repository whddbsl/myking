import styled from "styled-components";

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
    width: 100%;
`;

export const H1 = styled.h1`
    font-size: 2rem;
    margin-bottom: 20px;
    color: #333;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
    margin-bottom: 15px;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    &:focus {
        border-color: #53beb1;
        outline: none;
    }
`;

export const Button = styled.button`
    padding: 10px 15px;
    font-size: 1rem;
    color: #fff;
    background-color: #53beb1;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #269386;
    }
`;
