"use client";

import { useUserStore } from "@/application/states/userStore";
import { restoreSession } from "@/components/user/AuthUtils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClientComponentClient();
    const { setUser, resetUser, hasHydrated } = useUserStore((state) => state);
    const router = useRouter();

    useEffect(() => {
        if (!hasHydrated) return;

        restoreSession(setUser, resetUser);

        // 실시간 세션 상태 감시
        const { data: subscription } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === "SIGNED_OUT" || !session) {
                    alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                    resetUser();
                    router.push("/auth");
                }
            }
        );

        return () => {
            subscription?.subscription.unsubscribe();
        };
    }, [supabase, setUser, resetUser]);

    return <>{children}</>;
}
