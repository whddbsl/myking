import { useState } from "react";
import {
    Logo,
    MenuItem,
    SidebarContainer,
    UnstyledLink,
} from "./sidebar.styles";

const AdminSidebar = () => {
    const [selectedMenu, setSelectedMenu] = useState("회원 관리");

    const handleMenuClick = (menu: string) => {
        setSelectedMenu(menu);
    };

    return (
        <>
            <SidebarContainer>
                <Logo src="/logos/logo.png" alt="마이킹 로고" />
                <ul>
                    <UnstyledLink href="/admin/user">
                        <MenuItem
                            $isSelected={selectedMenu === "회원 관리"}
                            onClick={() => handleMenuClick("회원 관리")}
                        >
                            회원 관리
                        </MenuItem>
                    </UnstyledLink>

                    <UnstyledLink href="/admin/mountain">
                        <MenuItem
                            $isSelected={selectedMenu === "산 관리"}
                            onClick={() => handleMenuClick("산 관리")}
                        >
                            산 관리
                        </MenuItem>
                    </UnstyledLink>
                    <UnstyledLink href="/admin/course">
                        <MenuItem
                            $isSelected={selectedMenu === "코스 관리"}
                            onClick={() => handleMenuClick("코스 관리")}
                        >
                            코스 관리
                        </MenuItem>
                    </UnstyledLink>
                    <UnstyledLink href="/admin/party">
                        <MenuItem
                            $isSelected={selectedMenu === "파티 관리"}
                            onClick={() => handleMenuClick("파티 관리")}
                        >
                            파티 관리
                        </MenuItem>
                    </UnstyledLink>
                </ul>
            </SidebarContainer>
        </>
    );
};

export default AdminSidebar;
