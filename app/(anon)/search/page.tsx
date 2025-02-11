"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { SearchMountainDto } from "@/application/usecases/mountainSearch/dto/SearchMountainDto";
import ProtectedRoute from "@/components/user/ProtectedRoutes";

// ---------------- styled-components ----------------
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
`;

const Title = styled.h1`
    font-size: 1.75rem;
    margin-bottom: 1rem;
    font-weight: 600;
    color: #333;
`;

const NavLinks = styled.ul`
    list-style: none;
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
`;

const SearchBox = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
`;

const SearchInput = styled.input`
    padding: 0.5rem 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    width: 200px;
    &:focus {
        outline: none;
        border-color: #666;
    }
`;

const SearchButton = styled.button`
    background-color: #269386;
    color: #fff;
    border: none;
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
    cursor: pointer;
    font-weight: 500;
    &:hover {
        background-color: #217b70;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    margin: 0.5rem;
`;

const ResultsContainer = styled.div`
    width: 100%;
    max-width: 600px;
`;

const MountainBox = styled.div`
    border: 1px solid #ccc;
    margin: 0.75rem 0;
    padding: 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        background-color: #f0f0f0;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }

    h2 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-size: 1.25rem;
        color: #222;
    }

    p {
        margin: 0.25rem 0;
        color: #555;
    }
`;

// ---------------- 메인 페이지 컴포넌트 ----------------
export default function Home() {
    // 검색어/결과/에러 상태
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchMountainDto[]>([]);
    const [error, setError] = useState("");

    // 검색 버튼 클릭 시 API 호출
    const handleSearch = async () => {
        setError("");
        try {
            // /api/search 라우트에 쿼리 전달 (예시)
            const response = await fetch(`/api/search?query=${query}`);
            if (!response.ok) {
                throw new Error("Failed to fetch search results");
            }
            const data: SearchMountainDto[] = await response.json();
            setResults(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    return (
        <ProtectedRoute>
            <Container>
                {/* 네비게이션 예시 */}
                <NavLinks>
                    <li>
                        <Link href="/parties">등산 메이트 모집</Link>
                    </li>
                    <li>
                        <Link href="/myPage/profile">마이페이지</Link>
                    </li>
                </NavLinks>

                {/* 검색창 */}
                <SearchBox>
                    <SearchInput
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="가고 싶은 산 이름을 입력하세요"
                    />
                    <SearchButton onClick={handleSearch}>검색</SearchButton>
                </SearchBox>
                {error && <ErrorMessage>{error}</ErrorMessage>}

                {/* 검색 결과 */}
                <ResultsContainer>
                    {results.map((mountain, index) => (
                        <Link
                            key={index}
                            href={`/mountains/${mountain.mountain_id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <MountainBox>
                                <h2>{mountain.name}</h2>
                                <p>위치: {mountain.region}</p>
                                <p>고도: {mountain.altitude}m</p>
                                <p>{mountain.description}</p>
                            </MountainBox>
                        </Link>
                    ))}
                </ResultsContainer>
            </Container>
        </ProtectedRoute>
    );
}
