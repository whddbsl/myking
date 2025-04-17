// app/not-found.tsx
"use client";

import Link from "next/link";
import { FaMountain } from "react-icons/fa";
import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const Container = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #ecfdf5 0%, #ffffff 100%);
`;

const Content = styled.div`
    text-align: center;
    padding: 0 1rem;
`;

const IconWrapper = styled.div`
    margin-bottom: 2rem;
    animation: ${bounce} 2s infinite ease-in-out;
`;

const StyledIcon = styled(FaMountain)`
    width: 6rem;
    height: 6rem;
    color: #269386;
`;

const ErrorCode = styled.h1`
    font-size: 9rem;
    font-weight: 700;
    color: #269386;
    margin-bottom: 1rem;
    line-height: 1;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 1rem;
`;

const Description = styled.p`
    color: #4b5563;
    margin-bottom: 2rem;
    line-height: 1.5;
`;

const HomeButton = styled(Link)`
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    background-color: #269386;
    color: white;
    border-radius: 0.5rem;
    text-decoration: none;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #047857;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px #fff, 0 0 0 4px #059669;
    }

    svg {
        margin-right: 0.5rem;
    }
`;

export default function NotFound() {
    return (
        <Container>
            <Content>
                <IconWrapper>
                    <StyledIcon />
                </IconWrapper>

                <ErrorCode>404</ErrorCode>

                <Title>길을 잃으셨나요?</Title>

                <Description>찾으시는 페이지가 존재하지 않습니다.</Description>

                <HomeButton href="/">
                    <FaMountain />
                    홈으로 돌아가기
                </HomeButton>
            </Content>
        </Container>
    );
}
