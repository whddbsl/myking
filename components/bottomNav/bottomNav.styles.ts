import styled from "styled-components";

interface NavItemProps {
    $active: boolean;
}

export const NavContainer = styled.nav`
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 500px;
    display: flex;
    justify-content: space-around;
    background: #fff;
    padding: 12px 0;
    border: 1px solid #f2f2f2;
    height: 63px;
`;

export const NavItem = styled.div<NavItemProps>`
    flex: 1;
    text-align: center;
    color: ${(props) => (props.$active ? "black" : "#bfbfbf")};
`;

export const NavLink = styled.a`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    font-size: 13px;
    color: inherit;

    span {
        font-weight: bold;
    }
`;
