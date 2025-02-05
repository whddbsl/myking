"use client";
import styled from "styled-components";

export const Header = styled.header`
    padding: 16px;
    height: 48px;
    display: flex;
    align-items: center;
    h1 {
        font-size: 18px;
    }
`;

const PartyLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <Header>
                <h1>등산 메이트</h1>
            </Header>
            <div>{children}</div>
        </div>
    );
};

export default PartyLayout;
