"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

interface SupabaseProviderProp {
    children: React.ReactNode;
}

const AuthProvider: React.FC<SupabaseProviderProp> = ({ children }) => {
    const supabaseClient = createClientComponentClient();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("supabase-session");
        if (!token) {
            router.push("/auth");
        }
    }, [router]);

    return (
        <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={null}
        >
            {children}
        </SessionContextProvider>
    );
};

export default AuthProvider;
