import styled from "styled-components";
import Link from "next/link";

export const Main = styled.main`
    width: 100%;
`;

export const Table = styled.table`
    width: 100%;
    table-layout: fixed;
`;

export const Th = styled.th`
    border: 1px solid #808080;
    padding: 10px;
    text-align: center;
    background-color: #269386;
    color: white;
`;

export const Td = styled.td`
    border: 1px solid #808080;

    text-align: center;
    vertical-align: middle;
    padding: 10px;
`;

export const Tr = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

export const Button = styled.button`
    background-color: #53beb1;
    color: white;
    border: none;
    padding: 8px;
    border-radius: 5px;
    margin: 5px;
`;

export const UnstyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;
