"use client";
import styled from "styled-components";

export const Header = styled.header`
    height: 48px;
    display: flex;
    align-items: center;
    h1 {
        font-size: 18px;
    }
`;

const PartyCreateLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <div>
            <Header>
                <button>뒤로가기 버튼</button>
            </Header>
            <main>{children}</main>
        </div>
    );
};

export default PartyCreateLayout;
