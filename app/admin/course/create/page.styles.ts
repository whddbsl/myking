import styled from "styled-components";

export const AdminContainer = styled.div`
    min-height: 100vh;
    width: 100%;
    background-color: #f8fafc;
    padding: 2rem;
`;

export const ContentWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.5rem;
`;

export const FormWrapper = styled.form`
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const FormGroup = styled.div`
    margin-bottom: 1.5rem;
`;

export const Label = styled.label`
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #64748b;
    margin-bottom: 0.5rem;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    color: #334155;
    transition: all 0.2s;

    &:focus {
        outline: none;
        border-color: #0f766e;
        box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
    }

    &::placeholder {
        color: #94a3b8;
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    color: #334155;
    transition: all 0.2s;
    min-height: 150px;
    resize: vertical;

    &:focus {
        outline: none;
        border-color: #0f766e;
        box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
    }

    &::placeholder {
        color: #94a3b8;
    }
`;

export const Button = styled.button`
    background-color: #0f766e;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #0d6d63;
        transform: translateY(-1px);
    }

    &:disabled {
        background-color: #94a3b8;
        cursor: not-allowed;
        transform: none;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
`;

export const CancelButton = styled(Button)`
    background-color: #f1f5f9;
    color: #64748b;

    &:hover {
        background-color: #e2e8f0;
    }
`;

export const ImagePreviewWrapper = styled.div`
    margin-bottom: 1rem;
`;

export const CurrentImage = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 0.5rem;
    overflow: hidden;
    margin-bottom: 1rem;
    position: relative;
    background-color: #f1f5f9;
`;

export const ImageUploadLabel = styled.label`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background-color: #f1f5f9;
    color: #475569;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: #e2e8f0;
    }
`;

export const HiddenFileInput = styled.input`
    display: none;
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const ReadOnlyField = styled.div`
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background-color: #f3f4f6;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #374151;
    cursor: not-allowed;
`;

export const Select = styled.select`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    font-size: 0.875rem;
`;
