"use client";
import HeaderComponent from "@/components/header/header";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const PartyLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const rawPathname = usePathname();
    const [pathname, setPathname] = useState("");

    useEffect(() => {
        setPathname(rawPathname);
    }, [rawPathname]);

    let title: string = "등산메이트";
    let showBackButton: boolean = false;

    const isDynamicRoute = /^\/parties\/\d+$/.test(pathname); // /parties/숫자 형식 확인

    if (isDynamicRoute) {
        title = "상세보기";
        showBackButton = true;
    } else if (pathname.includes("create")) {
        title = "작성하기";
        showBackButton = true;
    }

    return (
        <div>
            <HeaderComponent title={title} showBackButton={showBackButton} />
            <div>{children}</div>
        </div>
    );
};

export default PartyLayout;
