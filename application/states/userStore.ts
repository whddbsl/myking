import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
    isLoggedIn: boolean;
    kakaoId: string | "";
    name: string | "";
    nickname: string;
    profileImage: string | "";
    setUser: (
        kakaoId: string,
        name: string,
        nickname: string,
        profileImage: string
    ) => void; // 사용자 정보 설정
    resetUser: () => void; // 상태 초기화(로그아웃)
    hasHydrated: boolean; // 상태 복원 여부
    setHasHydrated: (state: boolean) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            kakaoId: "",
            name: "",
            nickname: "",
            profileImage: "",
            hasHydrated: false,
            setHasHydrated: (state) => set({ hasHydrated: state }),
            setUser: (kakaoId, name, nickname, profileImage) =>
                set({
                    isLoggedIn: true,
                    kakaoId,
                    name,
                    nickname,
                    profileImage,
                }),
            resetUser: () =>
                set({
                    isLoggedIn: false,
                    kakaoId: "",
                    name: "",
                    nickname: "",
                    profileImage: "",
                }),
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
