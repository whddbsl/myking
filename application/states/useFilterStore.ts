// src/stores/filterStore.ts
import { create } from "zustand";
import { FilterDto } from "@/application/usecases/partyLookup/dto/FilterDto";

interface FilterStore {
    filters: FilterDto;
    setFilters: (newFilters: FilterDto) => void;
    updateFilter: (key: keyof FilterDto, value: any) => void;
    resetFilters: () => void; // 리셋 함수 추가
}

// 초기 상태를 별도의 변수로 정의합니다.
const initialFilter: FilterDto = {
    mountain_id: 0,
    filter_state: "",
    filter_gender: [],
    filter_age: [],
};

export const useFilterStore = create<FilterStore>((set) => ({
    filters: initialFilter,
    setFilters: (newFilters: FilterDto) => set({ filters: newFilters }),
    updateFilter: (key, value) =>
        set((state) => ({
            filters: {
                ...state.filters,
                [key]: value,
            },
        })),
    resetFilters: () => set({ filters: initialFilter }), // 상태 초기화 기능
}));
