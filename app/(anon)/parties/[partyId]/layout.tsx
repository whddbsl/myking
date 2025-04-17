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

const PartyDetailLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <div>
            <div>{children}</div>
        </div>
    );
};

export default PartyDetailLayout;
