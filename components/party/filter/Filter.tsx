// Filter.tsx
import { useState } from "react";
import { MountainListDto } from "@/application/usecases/partyLookup/dto/MountainListDto";
import { useFilterStore } from "@/application/states/useFilterStore";
import * as F from "./Filter.styles";

// 컴포넌트 Props 타입 정의
interface FilterProps {
    mountainList: MountainListDto[];
    onClose: () => void;
}

const Filter = ({ mountainList, onClose }: FilterProps) => {
    // 전역 필터 상태(확인 전 값)와 업데이트 액션을 zustand에서 가져옵니다.
    const globalFilters = useFilterStore((state) => state.filters);
    const updateFilter = useFilterStore((state) => state.updateFilter);

    // 로컬 상태를 만들어서 사용자가 변경하는 값들을 저장합니다.
    const [localFilters, setLocalFilters] = useState(globalFilters);

    // 산 선택 핸들러: 로컬 상태에 변경을 반영합니다.
    const handleMountainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // e.target.value는 string이므로 숫자로 변환합니다.
        const selectedMountainId = Number(e.target.value);
        setLocalFilters({
            ...localFilters,
            mountain_id: selectedMountainId,
        });
    };

    // 모집 상태 선택 핸들러: 로컬 상태 업데이트
    const handleStateChange = (state: "모집중" | "마감") => {
        setLocalFilters({
            ...localFilters,
            filter_state: state,
        });
    };

    // 성별 선택 핸들러: 로컬 상태 업데이트
    const handleGenderChange = (gender: "여성" | "남성" | "성별무관") => {
        setLocalFilters({
            ...localFilters,
            filter_gender: gender,
        });
    };

    // 나이 선택 핸들러: 이미 선택되어 있다면 해제, 아니면 추가
    const handleAgeSelection = (age: string) => {
        const newAges = localFilters.filter_age.includes(age)
            ? localFilters.filter_age.filter((a) => a !== age)
            : [...localFilters.filter_age, age];
        setLocalFilters({
            ...localFilters,
            filter_age: newAges,
        });
    };

    // 확인 버튼 핸들러: 로컬 상태의 값을 전역 상태에 업데이트하고 onClose를 호출합니다.
    const handleConfirm = () => {
        updateFilter("mountain_id", localFilters.mountain_id);
        updateFilter("filter_state", localFilters.filter_state);
        updateFilter("filter_gender", localFilters.filter_gender);
        updateFilter("filter_age", localFilters.filter_age);
        onClose();
    };

    return (
        <div>
            {/* 산 선택 영역 */}
            <F.Mountain>
                <p>산</p>
                <select
                    name="mountain_id"
                    value={localFilters.mountain_id ?? ""}
                    onChange={handleMountainChange}
                    required
                >
                    <option value="">산 선택하기</option>
                    {mountainList.map((mountain) => (
                        <option
                            key={mountain.mountain_id}
                            value={mountain.mountain_id}
                        >
                            {mountain.mountain_name}
                        </option>
                    ))}
                </select>
            </F.Mountain>

            {/* 모집 상태 선택 영역 */}
            <div>
                <p>모집상태</p>
                <div>
                    {["모집중", "마감"].map((state) => (
                        <F.FilterSelect
                            key={state}
                            selected={localFilters.filter_state === state}
                            onClick={() =>
                                handleStateChange(state as "모집중" | "마감")
                            }
                        >
                            {state}
                        </F.FilterSelect>
                    ))}
                </div>
            </div>

            {/* 성별 선택 영역 */}
            <div>
                <h1>성별</h1>
                <div>
                    {["남성", "여성", "성별무관"].map((gender) => (
                        <F.FilterSelect
                            key={gender}
                            selected={localFilters.filter_gender === gender}
                            onClick={() =>
                                handleGenderChange(
                                    gender as "여성" | "남성" | "성별무관"
                                )
                            }
                        >
                            {gender}
                        </F.FilterSelect>
                    ))}
                </div>
            </div>

            {/* 나이 선택 영역 */}
            <div>
                <h1>나이</h1>
                <div>
                    {["20대", "30대", "40대", "50대", "60대 이상"].map(
                        (age) => (
                            <F.FilterSelect
                                key={age}
                                onClick={() => handleAgeSelection(age)}
                                selected={localFilters.filter_age.includes(age)}
                            >
                                {age}
                            </F.FilterSelect>
                        )
                    )}
                </div>
            </div>

            {/* 확인 버튼 클릭 시 전역 상태 업데이트 후 모달(또는 필터 UI) 종료 */}
            <button onClick={handleConfirm}>확인</button>
        </div>
    );
};

export default Filter;
