"use client";

import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";
import { SearchMountainDto } from "@/application/usecases/mountainSearch/dto/SearchMountainDto";
import ProtectedRoute from "@/components/user/ProtectedRoutes";

// ---------------- styled-components ----------------
const TopSearchContainer = styled.div`
    width: 100%;
    padding: 1rem;
    background-color: #fff;
`;

const SearchBarWrapper = styled.div`
    display: flex;
    align-items: center;
    background-color: #e9e9e9; /* 더 진한 회색 */
    border-radius: 24px;
    padding: 0.5rem 1rem;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
`;

const BackIcon = styled(Link)`
    display: block;
    width: 24px;
    height: 24px;
    background-image: url("/images/back_button.svg"); /* 아이콘 경로 */
    background-size: contain;
    background-repeat: no-repeat;
    text-decoration: none;
`;

const SearchInputField = styled.input`
    flex: 1;
    border: none;
    outline: none;
    background-color: transparent;
    margin: 0 0.75rem;
    font-size: 1rem;
    color: #333;

    &::placeholder {
        color: #aaa;
    }
`;

const SearchIcon = styled.div`
    width: 24px;
    height: 24px;
    background-image: url("/images/searchIcon.svg");
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
`;

const ResultsContainer = styled.div`
    width: 100%;
    max-width: 600px;
`;

const MountainBox = styled.div`
    border: 1px solid #ccc;
    margin: 1.75rem 20px;
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
            <TopSearchContainer>
                <SearchBarWrapper>
                    {/* Link로 뒤로가기 버튼 구현 */}
                    <BackIcon href="/" />
                    <SearchInputField
                        placeholder="검색어를 입력해주세요."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch();
                        }}
                    />
                    <SearchIcon onClick={handleSearch} />
                </SearchBarWrapper>
            </TopSearchContainer>
            {/* 검색 결과 목록 */}
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
        </ProtectedRoute>
    );
}
