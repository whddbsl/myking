import * as NV from "@/components/user/profileNavBar/profileNavBar.styles";
import { usePathname, useRouter } from "next/navigation";

const ProfileNavBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <NV.NavContainer>
            <NV.NavItem
                $active={pathname === "/myPage/profile"}
                onClick={() => router.push("/myPage/profile")}
            >
                나의 하이킹
            </NV.NavItem>
            <NV.NavItem
                $active={pathname === "/myPage/map"}
                onClick={() => router.push("/myPage/map")}
            >
                정상 정복 지도
            </NV.NavItem>
        </NV.NavContainer>
    );
};

export default ProfileNavBar;
