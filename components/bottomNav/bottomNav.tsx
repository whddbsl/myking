"use client";

import * as BN from "@/components/bottomNav/bottomNav.styles";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const BottomNav = () => {
    const pathname = usePathname();
    const [currentPath, setCurrentPath] = useState<string>("");

    useEffect(() => {
        if (pathname) {
            setCurrentPath(pathname);
        }
    }, [pathname]);

    const navItems = [
        { name: "등산 메이트", href: "/parties", icon: "/images/parties.svg" },
        {
            name: "홈",
            href: "/",
            additionalPaths: ["/mountains"],
            icon: "/images/home.svg",
        },
        {
            name: "마이",
            href: "/myPage/profile",
            additionalPaths: ["/myPage/map", "/profile"],
            icon: "/images/myPage.svg",
        },
    ];

    // 클라이언트 측 경로가 설정될 때까지 컴포넌트 렌더링하지 않음
    if (!currentPath) {
        return null;
    }

    return (
        <BN.NavContainer>
            {navItems.map((item) => {
                const isActive = !!(
                    currentPath === item.href || // 정확히 일치하는 경우
                    currentPath.startsWith(item.href + "/") || // 동적 경로 대응
                    (item.additionalPaths &&
                        item.additionalPaths.some(
                            (path) =>
                                currentPath === path ||
                                currentPath.includes(path + "/")
                        ))
                ); // 추가 경로 비교
                return (
                    <BN.NavItem key={item.href} $active={isActive}>
                        <Link href={item.href} passHref legacyBehavior>
                            <BN.NavLink as="a">
                                <img
                                    src={item.icon}
                                    alt={item.name || "아이콘"}
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        filter: isActive
                                            ? "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)"
                                            : "invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(80%)",
                                    }}
                                />
                                <span>{item.name}</span>
                            </BN.NavLink>
                        </Link>
                    </BN.NavItem>
                );
            })}
        </BN.NavContainer>
    );
};

export default BottomNav;
