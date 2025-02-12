import { useState, useEffect } from "react";
import { MountainListDto } from "@/application/usecases/partyLookup/dto/MountainListDto";
import { useFilterStore } from "@/application/states/useFilterStore";
import * as F from "./Filter.styles";

// 컴포넌트 Props 타입 정의
interface FilterProps {
    mountainList: MountainListDto[];
    isOpen: boolean;
    onClose: () => void;
}

const Filter = ({ mountainList, isOpen, onClose }: FilterProps) => {
    const { resetFilters } = useFilterStore();
    const globalFilters = useFilterStore((state) => state.filters);
    const updateFilter = useFilterStore((state) => state.updateFilter);

    // 로컬 상태를 만들어서 사용자가 변경하는 값들을 저장합니다.
    const [localFilters, setLocalFilters] = useState(globalFilters);
    console.log(localFilters);
    // 전역 필터 상태가 변경될 때마다 로컬 상태도 업데이트
    useEffect(() => {
        setLocalFilters(globalFilters);
    }, [globalFilters]);

    // 산 선택 핸들러: 로컬 상태에 변경을 반영합니다.
    const handleMountainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    const handleGenderChange = (gender: string) => {
        const newGender = localFilters.filter_gender.includes(gender)
            ? localFilters.filter_gender.filter((a) => a !== gender)
            : [...localFilters.filter_gender, gender];
        setLocalFilters({
            ...localFilters,
            filter_gender: newGender,
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

    // 초기화 버튼 핸들러 (resetFilters를 호출하면 useEffect를 통해 로컬 상태도 업데이트됩니다)
    const handleReset = () => {
        resetFilters();
        setLocalFilters({
            mountain_id: 0,
            filter_state: "",
            filter_gender: [],
            filter_age: [],
        });
    };

    return (
        <F.Overlay $isOpen={isOpen} onClick={onClose}>
            <F.BottomSheet
                $isOpen={isOpen}
                onClick={(e) => e.stopPropagation()}
            >
                <F.Header>
                    <h2>필터</h2>
                    <button onClick={onClose}>✕</button>
                </F.Header>

                <F.Content>
                    {/* 산 선택 */}
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

                    {/* 모집 상태 선택 */}
                    <F.FilterGroup>
                        <h1>모집상태</h1>
                        <div>
                            {["모집중", "마감"].map((state) => (
                                <F.FilterSelect
                                    key={state}
                                    selected={
                                        localFilters.filter_state === state
                                    }
                                    onClick={() =>
                                        handleStateChange(
                                            state as "모집중" | "마감"
                                        )
                                    }
                                >
                                    {state}
                                </F.FilterSelect>
                            ))}
                        </div>
                    </F.FilterGroup>

                    {/* 성별 선택 */}
                    <F.FilterGroup>
                        <h1>성별</h1>
                        <div>
                            {["남성", "여성"].map((gender) => (
                                <F.FilterSelect
                                    key={gender}
                                    selected={localFilters.filter_gender.includes(
                                        gender
                                    )}
                                    onClick={() => handleGenderChange(gender)}
                                >
                                    {gender}
                                </F.FilterSelect>
                            ))}
                        </div>
                    </F.FilterGroup>

                    {/* 나이 선택 */}
                    <F.FilterGroup>
                        <h1>나이</h1>
                        <div>
                            {["20대", "30대", "40대", "50대", "60대 이상"].map(
                                (age) => (
                                    <F.FilterSelect
                                        key={age}
                                        onClick={() => handleAgeSelection(age)}
                                        selected={localFilters.filter_age.includes(
                                            age
                                        )}
                                    >
                                        {age}
                                    </F.FilterSelect>
                                )
                            )}
                        </div>
                    </F.FilterGroup>
                </F.Content>

                <F.ButtonGroup>
                    <button onClick={handleReset}>초기화</button>
                    <button onClick={handleConfirm}>확인</button>
                </F.ButtonGroup>
            </F.BottomSheet>
        </F.Overlay>
    );
};

export default Filter;
