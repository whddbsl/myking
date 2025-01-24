"use client";

// import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const SignUpLayout = ({ children }: { children: ReactNode }) => {
    // return <SessionProvider>{children}</SessionProvider>;
    return <>{children}</>;
};

export default SignUpLayout;
