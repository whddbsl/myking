"use client";

import { usePathname } from "next/navigation";
import HeaderComponent from "@/components/header/header";
import ProfileNavBar from "@/components/user/profileNavBar/profileNavBar";
import styled from "styled-components";
import { ProfileMain } from "./profile/page.styles";

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
    const pathname = usePathname();

    let title: string = "마이페이지";
    let showBackButton: boolean = false;

    if (pathname.includes("profile") && pathname.includes("edit")) {
        title = "내 정보 확인";
        showBackButton = true;
    }

    return (
        <>
            <HeaderComponent
                title={title}
                showBackButton={showBackButton}
            ></HeaderComponent>
            {!pathname.includes("profile/edit") && (
                <NavBarContainer>
                    <ProfileNavBar />
                </NavBarContainer>
            )}
            <ProfileMain>{children}</ProfileMain>
        </>
    );
}
