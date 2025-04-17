import styled from "styled-components";
import Link from "next/link";

export const AdminContainer = styled.div`
    min-height: 100vh;
    background-color: #f8fafc;
    padding: 2rem;
    width: 100%;
`;

export const ContentWrapper = styled.div`
    max-width: 1200px;
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

export const Table = styled.table`
    width: 100%;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

export const Thead = styled.thead`
    background-color: #f1f5f9;
`;

export const Th = styled.th`
    padding: 1rem;
    text-align: left;
    font-weight: 500;
    color: #64748b;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-align: center;
`;

export const Tbody = styled.tbody`
    & tr:hover {
        background-color: #f8fafc;
    }
`;

export const Tr = styled.tr`
    border-bottom: 1px solid #e2e8f0;
    transition: all 0.2s;
`;

export const Td = styled.td`
    padding: 0.8rem;
    color: #334155;
    font-size: 0.875rem;
    vertical-align: middle;
    text-align: center;
`;

export const ActionButton = styled.button`
    padding: 0.5rem;
    border-radius: 0.375rem;
    transition: all 0.2s;
    margin: 0 0.25rem;

    &.delete {
        color: #dc2626;
        &:hover {
            background-color: #fee2e2;
        }
    }

    &.detail {
        color: #0f766e;
        &:hover {
            background-color: #ccfbf1;
        }
    }
`;

export const AddButton = styled(Link)`
    background-color: #0f766e;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;

    &:hover {
        background-color: #0d6d63;
        transform: translateY(-1px);
    }
`;

export const UnstyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

export const DetailContainer = styled.div`
    display: flex;
    gap: 2rem;
    padding: 1.5rem;
    background-color: #f8fafc;
`;

export const DetailText = styled.div`
    flex: 1;

    ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            margin-bottom: 0.5rem;
            color: #334155;
            font-size: 1rem;
            text-align: left;
        }
    }
`;
