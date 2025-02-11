import styled from "styled-components";

interface NavItemProps {
    $active?: boolean;
}

export const NavContainer = styled.div`
    display: flex;
    width: 95%;
    height: 50px;
    align-items: center;
`;

export const NavItem = styled.div<NavItemProps>`
    flex: 1;
    text-align: center;
    padding: 16px;
    cursor: pointer;
    font-size: 18px;
    color: ${({ $active }) => ($active ? "#000" : "#ccc")};
    font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
    position: relative;
    transition: color 0.3s;

    &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: ${({ $active }) => ($active ? "#000" : "#ccc")};
    }
`;
