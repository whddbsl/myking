"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { SearchMountainDto } from "@/application/usecases/mountainSearch/dto/SearchMountainDto";

// 전체 화면 컨테이너
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
`;

// 페이지 제목
const Title = styled.h1`
    font-size: 1.75rem;
    margin-bottom: 1rem;
    font-weight: 600;
    color: #333;
`;

// 검색창 박스
const SearchBox = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
`;

// 검색어 입력
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

// 검색 버튼
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

// 에러 메시지
const ErrorMessage = styled.p`
    color: red;
    margin: 0.5rem;
`;

// 검색 결과 목록 컨테이너
const ResultsContainer = styled.div`
    width: 100%;
    max-width: 600px;
`;

// 단일 산 박스
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

export default function MountainSearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchMountainDto[]>([]);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        setError("");
        try {
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
        <Container>
            <Title>가고싶은 산을 검색해보세요</Title>
            <SearchBox>
                <SearchInput
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="산 이름을 입력하세요"
                />
                <SearchButton onClick={handleSearch}>검색</SearchButton>
            </SearchBox>
            {error && <ErrorMessage>{error}</ErrorMessage>}

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
    );
}
