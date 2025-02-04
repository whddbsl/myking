"use client";

import { usePathname } from "next/navigation";
import { ProfileMain } from "./page.styles";
import HeaderComponent from "@/components/header/header";

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
            <ProfileMain>{children}</ProfileMain>
        </>
    );
}
