"use client";

import HeaderComponent from "@/components/header/header";

interface ProfileLayoutProps {
    children: React.ReactNode;
    title: string;
    showBackButton: boolean;
}

export default function ProfileLayout({
    children,
    title,
    showBackButton = false,
}: ProfileLayoutProps) {
    return (
        <>
            <HeaderComponent title={title} showBackButton={showBackButton} />
            <div style={{ padding: "0 16px" }}>{children}</div>
        </>
    );
}
