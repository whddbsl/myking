"use client";

import * as BN from "@/components/bottomNav/bottomNav.styles";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav = () => {
    const pathname = usePathname();

    const navItems = [
        { name: "등산메이트", href: "/parties", icon: "/images/parties.svg" },
        { name: "홈", href: "/", icon: "/images/home.svg" },
        {
            name: "마이",
            href: "/myPage/profile",
            additionalPaths: ["/myPage/map"],
            icon: "/images/myPage.svg",
        },
    ];

    return (
        <BN.NavContainer>
            {navItems.map((item) => {
                const isActive = !!(item.href === "/"
                    ? pathname === item.href
                    : (pathname.startsWith(item.href) ||
                          (item.additionalPaths &&
                              item.additionalPaths.some((path) =>
                                  pathname.startsWith(path)
                              ))) ??
                      false);
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
