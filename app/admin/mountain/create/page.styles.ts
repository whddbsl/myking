import styled from "styled-components";

export const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    min-height: 100vh;
    width: 100%;
`;

export const Title = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: #333;
`;

export const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    background-color: #f2f2f2;
    padding: 2rem;
    border-radius: 8px;
    gap: 1rem;
`;

export const Label = styled.label`
    font-size: 1rem;
    color: #555;
`;

export const Input = styled.input`
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s;
    &:focus {
        border-color: #53beb1;
        outline: none;
    }
`;

export const Button = styled.button`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    color: #fff;
    background-color: #53beb1;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #269386;
    }
`;

export const TextArea = styled.textarea`
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s;
    min-height: 100px;
    resize: vertical;
    &:focus {
        border-color: #53beb1;
        outline: none;
    }
`;
