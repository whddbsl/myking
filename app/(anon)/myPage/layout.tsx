"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HeaderComponent from "@/components/header/header";
import ProfileNavBar from "@/components/user/profileNavBar/profileNavBar";
import styled from "styled-components";
import { ProfileMain } from "./profile/page.styles";
import ProtectedRoute from "@/components/user/ProtectedRoutes";

const NavBarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const rawPathname = usePathname();
    const [pathname, setPathname] = useState("");

    useEffect(() => {
        setPathname(rawPathname);
    }, [rawPathname]);

    let title: string = "마이페이지";
    let showBackButton: boolean = false;

    if (pathname.includes("profile") && pathname.includes("edit")) {
        title = "내 정보 확인";
        showBackButton = true;
    } else if (pathname.includes("profile") && pathname.includes("myCreated")) {
        title = "내가 올린 파티";
        showBackButton = true;
    } else if (
        pathname.includes("profile") &&
        pathname.includes("myParticipated")
    ) {
        title = "내가 참여한 파티";
        showBackButton = true;
    }

    return (
        <ProtectedRoute>
            <HeaderComponent title={title} showBackButton={showBackButton} />
            {pathname &&
                !pathname.includes("profile/edit") &&
                !pathname.includes("myCreated") &&
                !pathname.includes("myParticipated") && (
                    <NavBarContainer>
                        <ProfileNavBar />
                    </NavBarContainer>
                )}
            {/* <ProfileMain>{children}</ProfileMain> */}
            {children}
        </ProtectedRoute>
    );
}
