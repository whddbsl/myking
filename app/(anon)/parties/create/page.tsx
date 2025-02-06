"use client";

import { useState, useEffect } from "react";
import * as P from "./page.styles";
import { useRouter } from "next/navigation";
import { PartyCreateDto } from "@/application/usecases/party/dto/PartyCreateDto";
import { AdminMountainListDto } from "@/application/usecases/admin/mountain/dto/AdminMountainListDto";

const PartyCreatePage: React.FC = () => {
    const router = useRouter();
    const [party, setParty] = useState<PartyCreateDto>({
        creator_id: "6219a949-5559-4a73-8ed0-34f065366dc0", // TODO: 로그인된 사용자 ID로 변경
        mountain_id: 0,
        description: "",
        max_members: 2,
        meeting_date: "",
        end_date: "",
        filter_gender: "성별무관",
        filter_age: [],
    });
    const [mountains, setMountains] = useState<AdminMountainListDto[]>([]); // 다시바꿔라
    const [selectedGender, setSelectedGender] = useState<string>("");
    const [selectedAges, setSelectedAges] = useState<string[]>([]);
    const [count, setCount] = useState(party.max_members);

    // 산 정보 조회
    useEffect(() => {
        fetch("/api/admin/mountain")
            .then((response) => response.json())
            .then((data) => {
                const filteredData = data.map((item: AdminMountainListDto) => ({
                    mountain_id: item.mountain_id,
                    name: item.name,
                }));
                setMountains(filteredData);
            });
    }, []);

    // 날짜 선택
    const today = new Date().toISOString().split("T")[0];

    const handleMeetingDateClick = () => {
        if (!party.end_date) {
            alert("모집 마감일을 먼저 선택해주세요.");
        }
    };

    // 입력값 변경 핸들러 (input, select 공통)
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setParty({ ...party, [name]: value });
    };

    const minCount = 2;
    const maxCount = 50;

    // 인원 선택 핸들러
    const validatedCount = (newValue: number) => {
        if (newValue < minCount) {
            alert("최소 인원은 2명입니다.");
            return false;
        } else if (newValue > maxCount) {
            alert("최대 50명까지 선택 가능합니다.");
            return false;
        }
        return true;
    };

    // 유효한 값만 적용
    const setValidatedCount = (newValue: number) => {
        if (validatedCount(newValue)) {
            setCount(newValue);
            setParty((prev) => ({ ...prev, max_members: newValue }));
        }
    };
    const decrease = () => setValidatedCount(count - 1);
    const increase = () => setValidatedCount(count + 1);

    // 성별 선택 핸들러
    const handleGenderChange = (gender: "남성" | "여성" | "성별무관") => {
        setParty({ ...party, filter_gender: gender });
        setSelectedGender(gender);
    };

    // 나이 선택 핸들러 (배열 업데이트)
    const handleAgeSelection = (age: string) => {
        setParty((prev) => ({
            ...prev,
            filter_age: prev.filter_age.includes(age)
                ? prev.filter_age.filter((a) => a !== age) // 선택 해제
                : [...prev.filter_age, age], // 선택 추가
        }));
        setSelectedAges((prev) =>
            prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
        );
    };

    // 파티 생성
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(party);

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
        <P.Container>
            <P.Form onSubmit={handleSubmit}>
                <div>
                    <P.Schedule>
                        <div>
                            <p>산</p>
                            <select
                                name="mountain_id"
                                value={party.mountain_id ?? ""}
                                onChange={handleChange}
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
                        </div>
                        <div>
                            <p>모집마감일</p>
                            <P.DateInput
                                type="date"
                                name="end_date"
                                value={party.end_date}
                                min={today}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <p>등산일자</p>
                            <P.DateInput
                                type="date"
                                name="meeting_date"
                                value={party.meeting_date}
                                min={party.end_date || today}
                                onChange={handleChange}
                                onClick={handleMeetingDateClick} // 클릭 시 알림 표시
                                readOnly={!party.end_date}
                                required
                            />
                        </div>
                    </P.Schedule>
                    <P.DescArea
                        name="description"
                        value={party.description}
                        onChange={handleChange}
                        placeholder="나만의 하이킹 메이트를 모집하는 글을 자유롭게 작성해 주세요. ex) 정기 등산, 맛집 킬러 등"
                        required
                        rows={7} // 기본적으로 4줄 높이 설정 (필요에 따라 조정 가능)
                    />

                    <P.Filter>
                        <div>
                            <h1>인원</h1>
                            <P.MaxMemberCounter>
                                <button onClick={decrease}>-</button>
                                <input
                                    type="number"
                                    name="max_members"
                                    value={count}
                                    min={minCount}
                                    max={maxCount}
                                    readOnly
                                />
                                <button onClick={increase}>+</button>
                            </P.MaxMemberCounter>
                        </div>
                        <div>
                            <h1>성별</h1>
                            <div>
                                {["남성", "여성", "성별무관"].map((gender) => (
                                    <P.FilterSelect
                                        key={gender}
                                        selected={selectedGender === gender}
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
                                    </P.FilterSelect>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h1>나이</h1>
                            <div>
                                {[
                                    "20대",
                                    "30대",
                                    "40대",
                                    "50대",
                                    "60대 이상",
                                ].map((age) => (
                                    <P.FilterSelect
                                        key={age}
                                        onClick={() => handleAgeSelection(age)}
                                        selected={selectedAges.includes(age)}
                                    >
                                        {age}
                                    </P.FilterSelect>
                                ))}
                            </div>
                        </div>
                    </P.Filter>
                </div>
                <P.SubmitButton>
                    <button type="submit">작성완료</button>
                </P.SubmitButton>
            </P.Form>
        </P.Container>
    );
};

export default PartyCreatePage;
