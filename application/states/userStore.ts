import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
    kakaoId: string | "";
    name: string | "";
    nickname: string;
    setUser: (kakaoId: string, name: string, nickname: string) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            kakaoId: "",
            name: "",
            nickname: "",
            setUser: (kakaoId, name, nickname) =>
                set({ kakaoId, name, nickname }),
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
