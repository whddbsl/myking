"use client";

import { useState } from "react";
import { SearchMountainDto } from "@/application/usecases/mountainSearch/dto/SearchMountainDto"; // DTO 가져오기

export default function MountainSearchPage() {
    const [query, setQuery] = useState(""); // 검색어 상태
    const [results, setResults] = useState<SearchMountainDto[]>([]); // 검색 결과 상태 타입 명시
    const [error, setError] = useState(""); // 에러 메시지 상태

    const handleSearch = async () => {
        setError(""); // 에러 초기화
        try {
            const response = await fetch(`/api/search?query=${query}`); // API 호출
            if (!response.ok) {
                throw new Error("Failed to fetch search results");
            }
            const data: SearchMountainDto[] = await response.json(); // API 응답 타입 설정
            setResults(data); // 검색 결과 설정
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message); // 에러 메시지 설정
            } else {
                setError("An unexpected error occurred"); // 예상치 못한 에러 처리
            }
        }
    };

    return (
        <div>
            <h1>산 검색</h1>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="산 이름 입력" />
            <button onClick={handleSearch}>검색</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                {results.map((mountain, index) => (
                    <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                        <h2>{mountain.name}</h2>
                        <p>위치: {mountain.region}</p>
                        <p>고도: {mountain.altitude}m</p>
                        <p>{mountain.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
