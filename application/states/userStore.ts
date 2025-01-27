import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
    isLoggedIn: boolean;
    kakaoId: string | "";
    name: string | "";
    nickname: string;
    setUser: (kakaoId: string, name: string, nickname: string) => void; // 사용자 정보 설정
    resetUser: () => void; // 상태 초기화(로그아웃)
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            kakaoId: "",
            name: "",
            nickname: "",
            setUser: (kakaoId, name, nickname) =>
                set({ isLoggedIn: true, kakaoId, name, nickname }),
            resetUser: () =>
                set({ isLoggedIn: false, kakaoId: "", name: "", nickname: "" }),
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
