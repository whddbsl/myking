"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/application/states/userStore";
import { restoreSession } from "@/components/user/AuthUtils";

export default function AuthCallback() {
    const { setUser, resetUser } = useUserStore((state) => state);
    const router = useRouter();

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                await restoreSession(setUser, resetUser);

                const { kakaoId } = useUserStore.getState();
                if (!kakaoId) {
                    alert("사용자 정보를 확인할 수 없습니다.");
                    router.push("/auth");
                    return;
                }

                const response = await fetch("/api/auth/checkUser", {
                    method: "POST",
                    body: JSON.stringify({ kakaoId }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    console.error("사용자 확인 실패:", await response.text());
                    alert("사용자 확인 중 오류가 발생했습니다.");
                    router.push("/auth");
                    return;
                }

                const result = await response.json();
                console.log("사용자 확인 결과: ", result);

                if (result.exists) {
                    router.push("/");
                } else {
                    router.push("/auth/setNickname");
                }
            } catch (error: any) {
                console.error("로그인 처리 중 오류 발생: ", error);
                alert("오류가 발생했습니다. 다시 시도해주세요.");
                router.push("/auth");
            }
        };

        handleAuthCallback();
    }, [router, setUser, resetUser]);

    return <div>로그인 처리 중...</div>;
}
