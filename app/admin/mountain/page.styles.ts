// app/admin/mountain/page.styles.ts
import styled from "styled-components";
import Link from "next/link";

export const AdminContainer = styled.div`
    min-height: 100vh;
    background-color: #f8fafc;
    padding: 1rem;
    width: 100%;
    box-sizing: border-box;
`;

export const ContentWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    width: 100%
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
    padding: 0.5rem;
    color: #334155;
    font-size: 0.875rem;
    vertical-align: middle;
    text-align: center;
`;

export const TdDescription = styled(Td)`
    max-width: 380px;
    width: 380px;
    vertical-align: middle;
    text-align: left;
`;

export const ActionButton = styled.button`
    padding: 0.5rem;
    border-radius: 0.375rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &.edit {
        color: #2563eb;
        &:hover {
            background-color: #dbeafe;
        }
    }

    &.delete {
        color: #dc2626;
        &:hover {
            background-color: #fee2e2;
        }
    }
`;

export const ActionWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
`;

export const Badge = styled.span`
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;

    &.altitude {
        background-color: #dbeafe;
        color: #1e40af;
    }

    &.region {
        background-color: #dcfce7;
        color: #166534;
    }
`;

export const ImagePreview = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 0.375rem;
    overflow: hidden;
    position: relative;
    background-color: #f1f5f9;
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const UnstyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;
