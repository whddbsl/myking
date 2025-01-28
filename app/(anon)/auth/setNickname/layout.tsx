"use client";

import { ReactNode } from "react";
import { Header, Main } from "./page.styles";
import ProtectedRoutes from "@/components/user/ProtectedRoutes";

const NicknameLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header>
                <img src="/logos/logo.png" alt="logo" />
            </Header>
            <ProtectedRoutes>
                <Main>{children}</Main>
            </ProtectedRoutes>
        </>
    );
};

export default NicknameLayout;
