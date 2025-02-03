"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

interface SupabaseProviderProp {
    children: React.ReactNode;
}

const AuthProvider: React.FC<SupabaseProviderProp> = ({ children }) => {
    const supabaseClient = createClientComponentClient();

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
