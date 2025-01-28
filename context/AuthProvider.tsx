"use client";

import { useUserStore } from "@/application/states/userStore";
import { restoreSession } from "@/components/user/AuthUtils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClientComponentClient();
    const { setUser, resetUser, hasHydrated } = useUserStore((state) => state);

    useEffect(() => {
        if (!hasHydrated) return;

        restoreSession(setUser, resetUser);
    }, [supabase, setUser, resetUser]);

    return <>{children}</>;
}
