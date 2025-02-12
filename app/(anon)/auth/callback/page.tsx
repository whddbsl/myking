"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/application/states/userStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ProtectedRoute from "@/components/user/ProtectedRoutes";
import LoadingSpinner from "@/components/loadingSpinner/loadingSpinner";

export default function AuthCallback() {
    const { setUser, resetUser } = useUserStore((state) => state);
    const router = useRouter();
    const supabase = createClientComponentClient();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                const { data } = await supabase.auth.getSession();

                setUser(
                    data.session?.user.user_metadata.provider_id,
                    data.session?.user.user_metadata.name,
                    "",
                    ""
                );

                localStorage.setItem(
                    "supabase-session",
                    JSON.stringify(data.session)
                );

                const { kakaoId } = useUserStore.getState();

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
                    setUser(
                        data.session?.user.user_metadata.provider_id,
                        data.session?.user.user_metadata.name,
                        result.nickname,
                        result.profileImage
                    );
                } else {
                    router.push("/auth/setNickname");
                }
            } catch (error: any) {
                console.error("로그인 처리 중 오류 발생: ", error);
                alert("오류가 발생했습니다. 다시 시도해주세요.");
                router.push("/auth");
            } finally {
                setIsLoading(false);
            }
        };

        handleAuthCallback();
    }, [router, setUser, resetUser]);

    return <ProtectedRoute>{isLoading && <LoadingSpinner />}</ProtectedRoute>;
}
