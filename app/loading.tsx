// app/loading.tsx
'use client';

import { FaMountain } from "react-icons/fa";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #ecfdf5 0%, #ffffff 100%);
`;

const LoadingIcon = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 2rem;
`;

const MountainIcon = styled(FaMountain)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3rem;
  height: 3rem;
  color: #269386;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const SpinnerRing = styled.div`
  width: 80px;
  height: 80px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #269386;
  border-radius: 50%;
  animation: ${spin} 1.5s linear infinite;
`;

const LoadingText = styled.p`
  color: #269386;
  font-size: 1.25rem;
  font-weight: 500;
  margin-top: 1rem;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const SubText = styled.p`
  color: #4b5563;
  font-size: 1rem;
  margin-top: 0.5rem;
`;

export default function Loading() {
  return (
    <Container>
      <LoadingIcon>
        <SpinnerRing />
        <MountainIcon />
      </LoadingIcon>
      <LoadingText>잠시만 기다려주세요</LoadingText>
      <SubText>새로운 등산로를 탐색하고 있습니다</SubText>
    </Container>
  );
}