"use client";

import { useState, useEffect } from "react";
import * as P from "./page.styles";
import { useRouter } from "next/navigation";
import { PartyCreateDto } from "@/application/usecases/party/dto/PartyCreateDto";
import { MountainListDto } from "@/application/usecases/partyLookup/dto/MountainListDto";

const PartyCreatePage: React.FC = () => {
    const router = useRouter();

    const [mountains, setMountains] = useState<MountainListDto[]>([]); // dto를 id와 name만 가져오는 dto로 변경

    const [party, setParty] = useState<PartyCreateDto>({
        creator_id: "6219a949-5559-4a73-8ed0-34f065366dc0", // TODO: 로그인된 사용자 ID로 변경
        mountain_id: 0,
        description: "",
        max_members: 1,
        meeting_date: "",
        end_date: "",
        filter_gender: "성별무관",
        filter_age: [],
    });

    // 산 정보 조회
    useEffect(() => {
        fetch("/api/admin/mountain")
            .then((response) => response.json())
            .then((data) => setMountains(data));
    }, []);

    // ✅ 입력값 변경 핸들러 (input, select 공통)
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setParty({ ...party, [name]: value });
    };

    // ✅ 성별 선택 핸들러
    const handleGenderChange = (gender: "남성" | "여성" | "성별무관") => {
        setParty({ ...party, filter_gender: gender });
    };

    // ✅ 나이 선택 핸들러 (배열 업데이트)
    const handleAgeSelection = (age: string) => {
        setParty((prev) => ({
            ...prev,
            filter_age: prev.filter_age.includes(age)
                ? prev.filter_age.filter((a) => a !== age) // 선택 해제
                : [...prev.filter_age, age], // 선택 추가
        }));
    };

    // 파티 생성
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch("/api/parties/create", {
            method: "POST",
            body: JSON.stringify(party),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            alert("모집 글이 등록되었습니다!");
            router.push("/parties");
        } else {
            const errorData = await response.json();
            alert("에러 발생: " + errorData.error);
        }
    };
    return (
        <P.Component>
            <h1>모집 글 작성</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="description"
                        value={party.description}
                        onChange={handleChange}
                        placeholder="나만의 하이킹 메이트를 모집하는 글을 자유롭게 작성해 주세요. ex) 정기 등산, 맛집 킬러 등"
                        required
                    />
                </div>
                <div>
                    <div>
                        <select
                            name="mountain_id"
                            value={party.mountain_id ?? ""}
                            required
                        >
                            <option value="">산 선택하기</option>
                            {mountains.map((mountain) => (
                                <option
                                    key={mountain.mountain_id}
                                    value={mountain.mountain_id}
                                >
                                    {mountain.name}
                                </option>
                            ))}
                        </select>
                        <span>일정 선택</span>
                        <input
                            type="datetime-local"
                            name="meeting_date"
                            value={party.meeting_date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <span>마감일 선택</span>
                    <input
                        type="datetime-local"
                        name="end_date"
                        value={party.end_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <div>
                        <p>인원</p>
                        <input
                            type="number"
                            name="max_members"
                            min="1"
                            max="20"
                            value={party.max_members}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <p>성별</p>
                        <div>
                            {["남성", "여성", "성별무관"].map((gender) => (
                                <span
                                    key={gender}
                                    onClick={() =>
                                        handleGenderChange(
                                            gender as
                                                | "남성"
                                                | "여성"
                                                | "성별무관"
                                        )
                                    }
                                >
                                    {gender}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p>나이</p>
                        <div>
                            {["20대", "30대", "40대", "50대", "60대 이상"].map(
                                (age) => (
                                    <span
                                        key={age}
                                        onClick={() => handleAgeSelection(age)}
                                    >
                                        {age}
                                    </span>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </form>
            <button type="submit">작성완료</button>
        </P.Component>
    );
};

export default PartyCreatePage;
