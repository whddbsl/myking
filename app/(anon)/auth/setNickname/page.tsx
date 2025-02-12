"use client";

import { Form, NicknameContainer } from "./page.styles";
import { useUserStore } from "@/application/states/userStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SubmitButtonComponent from "@/components/button/submitButton";
import ProfileImageUploader from "@/components/user/profileImageUploader/ProfileImageUploader";
import LoadingSpinner from "@/components/loadingSpinner/loadingSpinner";

export default function SetNickname() {
    const router = useRouter();
    const supabase = createClientComponentClient();
    const { kakaoId, name, nickname, setUser } = useUserStore((state) => state);
    const [inputNickname, setInputNickname] = useState("");
    const [profileImage, setProfileImage] = useState<string>(
        "/images/member_default.svg"
    );
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session?.user) {
                    const kakaoId =
                        session.user.user_metadata.provider_id || "";
                    const name = session.user.user_metadata.name || "";

                    setUser(kakaoId, name, nickname, profileImage);
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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        setUser(kakaoId, name, inputNickname, profileImage);

        const formData = new FormData();

        formData.append("kakao_id", kakaoId);
        formData.append("name", name);
        formData.append("nickname", inputNickname);
        if (file) {
            formData.append("file", file);
        } else {
            formData.append(
                "file",
                new File(
                    [],
                    `https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/images/user/member_default.svg`
                )
            );
        }

        try {
            const response = await fetch("/api/auth", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("닉네임 설정 실패");
            }

            const result = await response.json();

            if (response.ok) {
                if (response.status === 201) {
                    console.log("닉네임 설정 성공:", result.message);
                    router.push("/");
                } else if (
                    response.status === 200 &&
                    result.message === "user already exists"
                ) {
                    console.log("이미 등록된 사용자:", result.message);
                    router.push("/");
                } else {
                    throw new Error(
                        result.message || "알 수 없는 오류가 발생했습니다."
                    );
                }
            } else {
                if (
                    response.status === 400 &&
                    result.message === "nickname already exists"
                ) {
                    alert("이미 존재하는 닉네임입니다.");
                } else {
                    throw new Error(result.message || "오류가 발생했습니다.");
                }
            }

            router.push("/");
        } catch (error: any) {
            console.error("닉네임 설정 중 오류 발생", error);
            alert("닉네임 설정 중 문제가 발생했습니다. 다시 시도해주세요");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <ProfileImageUploader
                profileImage={profileImage}
                setFile={setFile}
                setProfileImage={setProfileImage}
            />
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
                    required
                />
            </NicknameContainer>
            <SubmitButtonComponent text="마이킹 시작하기" />
        </Form>
    );
}
