"use client";

import { ReactNode } from "react";
import { Main } from "./page.styles";
import ProtectedRoutes from "@/components/user/ProtectedRoutes";
import HeaderComponent from "@/components/header/header";

const NicknameLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <ProtectedRoutes>
                <HeaderComponent logoSrc="/logos/logo.png" />
                <Main>{children}</Main>
            </ProtectedRoutes>
        </>
    );
};

export default NicknameLayout;
