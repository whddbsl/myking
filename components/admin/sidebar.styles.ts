import styled from "styled-components";
import Link from "next/link";
interface MenuItemProps {
    $isSelected: boolean;
}

export const SidebarContainer = styled.div`
    width: 200px;
    min-height: 100vh;
    background-color: #f2f2f2;
    color: #000;
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

export const MenuItem = styled.li<MenuItemProps>`
    padding: 10px 20px;
    background-color: ${(props) =>
        props.$isSelected ? "#269386" : "transparent"};
    color: ${(props) => (props.$isSelected ? "#fff" : "#000")};
    &:hover {
        background-color: ${(props) =>
            props.$isSelected ? "#269386" : "#e0e0e0"};
    }
    border-radius: 10px;
`;

export const Logo = styled.img`
    width: 100%;
    margin: 20px 0;
`;

export const UnstyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;
