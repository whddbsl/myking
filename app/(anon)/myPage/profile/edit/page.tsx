"use client";

import {
    Main,
    NicknameContainer,
    ProfileImageContainer,
} from "@/app/(anon)/auth/setNickname/page.styles";
import { useUserStore } from "@/application/states/userStore";
import ProtectedRoute from "@/components/user/ProtectedRoutes";
import { useEffect, useState } from "react";

export default function ProfileEdit() {
    const { kakaoId, name, nickname, setUser } = useUserStore((state) => state);
    const [newNickname, setNewNickname] = useState<string>("");

    useEffect(() => {
        setNewNickname(nickname);
    }, [nickname]);

    const handleSaveNickname = () => {
        setUser(kakaoId, name, newNickname);
        localStorage.setItem(
            "user-storage",
            JSON.stringify({
                hasHydrated: true,
                isLoggedIn: true,
                kakaoId,
                name,
                nickname: newNickname,
            })
        );

        // DB에 닉네임 변경 적용 하는 로직 추가

        alert("닉네임이 변경되었습니다!");
    };

    return (
        <ProtectedRoute>
            <Main style={{ justifyContent: "unset" }}>
                <ProfileImageContainer>
                    <img
                        src="/images/member_default.svg"
                        alt="member_default"
                    />
                    <h4>프로필 수정</h4>
                </ProfileImageContainer>
                <NicknameContainer>
                    <h5>
                        닉네임 <span>*</span>
                    </h5>
                    <input
                        type="text"
                        value={newNickname}
                        onChange={(event) => setNewNickname(event.target.value)}
                        placeholder="닉네임 입력"
                        maxLength={20}
                        minLength={2}
                        required
                    />
                </NicknameContainer>
                <NicknameContainer>
                    <h5>이름</h5>
                    <input type="text" value={name} disabled />
                </NicknameContainer>
                {/* <NicknameContainer>
                    <h5>이메일</h5>
                    <input type="email" value="이메일" disabled />
                </NicknameContainer> */}
            </Main>
        </ProtectedRoute>
    );
}
