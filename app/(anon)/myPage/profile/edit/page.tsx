"use client";

import {
    Form,
    Main,
    NicknameContainer,
    ProfileImageContainer,
} from "@/app/(anon)/auth/setNickname/page.styles";
import { useUserStore } from "@/application/states/userStore";
import SubmitButtonComponent from "@/components/button/submitButton";
import HeaderComponent from "@/components/header/header";
import ProtectedRoute from "@/components/user/ProtectedRoutes";
import { getToken } from "@/utils/getToken";
import React, { useEffect, useState } from "react";

export default function ProfileEdit() {
    const { kakaoId, name, nickname, setUser } = useUserStore((state) => state);
    const [newNickname, setNewNickname] = useState<string>("");

    useEffect(() => {
        const fetchUser = async () => {
            const token = getToken();
            if (!token) return;

            try {
                const response = await fetch("/api/user/nickname", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("닉네임을 가져오는 데 실패했습니다.");
                }

                const data = await response.json();
                setNewNickname(data.nickname);
            } catch (error: any) {
                console.error("닉네임 가져오기 실패: ", error);
            }
        };
        fetchUser();
    }, [nickname]);

    const handleSaveNickname = async (event: React.FormEvent) => {
        event.preventDefault();

        const token = getToken();
        if (!token) return;

        try {
            const response = await fetch("/api/user/nickname/change", {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ newNickname }),
            });

            if (!response.ok) {
                throw new Error("닉네임 변경 실패");
            }

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

            const result = await response.json();
            setUser(kakaoId, name, newNickname);
            console.log("닉네임 변경 성공: ", result);
            alert(result.message);
        } catch (error: any) {
            console.error("닉네임 변경 중 오류 발생: ", error);
        }
    };

    return (
        <ProtectedRoute>
            <Main style={{ justifyContent: "unset" }}>
                <Form onSubmit={handleSaveNickname}>
                    <ProfileImageContainer style={{ marginTop: "10px" }}>
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
                            onChange={(event) =>
                                setNewNickname(event.target.value)
                            }
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
                    <SubmitButtonComponent text="수정 완료" />
                </Form>
            </Main>
        </ProtectedRoute>
    );
}
