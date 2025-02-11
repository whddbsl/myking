// src/stores/filterStore.ts
import { create } from "zustand";
import { FilterDto } from "@/application/usecases/partyLookup/dto/FilterDto";

interface FilterStore {
    filters: FilterDto;
    setFilters: (newFilters: FilterDto) => void;
    updateFilter: (key: keyof FilterDto, value: any) => void;
    // key: FilterDto의 key(mountain_id, filter_state...) 중에 있어야 한다
}

export const useFilterStore = create<FilterStore>((set) => ({
    filters: {
        mountain_id: 0,
        filter_state: "모집중",
        filter_gender: "성별무관",
        filter_age: [],
    },
    setFilters: (newFilters: FilterDto) => set({ filters: newFilters }),
    updateFilter: (key, value) =>
        set((state) => ({
            filters: {
                ...state.filters,
                [key]: value,
            },
        })),
}));
