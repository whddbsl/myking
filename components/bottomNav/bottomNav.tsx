"use client";

import * as BN from "@/components/bottomNav/bottomNav.styles";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const BottomNav = () => {
    const pathname = usePathname();
    const [currentPath, setCurrentPath] = useState("");

    useEffect(() => {
        setCurrentPath(pathname);
    }, [pathname]);

    const navItems = [
        { name: "등산메이트", href: "/parties", icon: "/images/parties.svg" },
        { name: "홈", href: "/", icon: "/images/home.svg" },
        { name: "마이", href: "/myPage/profile", icon: "/images/myPage.svg" },
    ];

    return (
        <BN.NavContainer>
            {navItems.map((item) => {
                const isActive = currentPath === item.href;
                return (
                    <BN.NavItem key={item.href} $active={isActive}>
                        <Link href={item.href} passHref legacyBehavior>
                            <BN.NavLink as="a">
                                <img
                                    src={item.icon}
                                    alt={item.name}
                                    style={{
                                        width: 24,
                                        height: 24,
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
