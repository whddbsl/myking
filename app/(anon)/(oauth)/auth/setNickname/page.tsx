"use client";

import {
    Form,
    Header,
    Main,
    NicknameContainer,
    ProfileImageContainer,
    SignUpButton,
} from "./page.styles";
import { useUserStore } from "@/application/states/userStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SetNickname() {
    const router = useRouter();
    const supabase = createClientComponentClient();
    const { kakaoId, name, nickname, setUser } = useUserStore((state) => state);
    const [inputNickname, setInputNickname] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (user) {
                const kakaoId = user.id || "";
                const name = user.user_metadata?.name || "";

                setUser(kakaoId, name, "");
            }
        };
        fetchUser();
    }, [supabase, setUser]);

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session?.user) {
                    const kakaoId = session.user.id || "";
                    const name = session.user.user_metadata.name || "";

                    setUser(kakaoId, name, "");
                }
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [supabase, setUser]);

    const handleNicknameChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputNickname(event.target.value);
    };

    const handleSetNickname = async (event: React.FormEvent) => {
        event.preventDefault();

        setUser(kakaoId, name, inputNickname);

        try {
            const response = await fetch("/api/auth", {
                method: "POST",
                body: JSON.stringify({
                    kakaoId,
                    name,
                    nickname: inputNickname,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("닉네임 설정 실패");
            }

            // const result = await response.json();
            // console.log("닉네임 설정 성공", result);

            router.push("/");
        } catch (error) {
            console.error("닉네임 설정 중 오류 발생", error);
        }
    };

    return (
        <>
            <Header>
                <img src="/logos/logo.png" alt="logo" />
            </Header>
            <Main>
                <Form onSubmit={handleSetNickname}>
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
                            placeholder="닉네임 입력"
                            maxLength={20}
                            minLength={2}
                            onChange={handleNicknameChange}
                        />
                    </NicknameContainer>
                    <SignUpButton type="submit">마이킹 시작하기</SignUpButton>
                </Form>
            </Main>
        </>
    );
}
