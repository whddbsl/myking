"use client";

import {
    Form,
    NicknameContainer,
} from "@/app/(anon)/auth/setNickname/page.styles";
import { useUserStore } from "@/application/states/userStore";
import SubmitButtonComponent from "@/components/button/submitButton";
import ProfileImageUploader from "@/components/user/profileImageUploader/ProfileImageUploader";
import { getToken } from "@/utils/getToken";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ErrorMessage } from "../page.styles";
import LoadingSpinner from "@/components/loadingSpinner/loadingSpinner";

const CustomProfileImageUploader = styled(ProfileImageUploader)`
    margin-top: 10px;
`;

export default function ProfileEdit() {
    const { kakaoId, name, nickname, profileImage, setUser } = useUserStore(
        (state) => state
    );
    const [currentNickname, setCurrentNickname] = useState<string>("");
    const [newNickname, setNewNickname] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [imgSrc, setImgSrc] = useState<string>("/images/member_default.svg");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchUser = async () => {
            const token = getToken();
            if (!token) return;

            try {
                const response = await fetch("/api/myPage/profile", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
                }

                const data = await response.json();

                setImgSrc(data.profile_image);
            } catch (error: any) {
                console.error("사용자 정보 가져오기 실패: ", error);
            }
        };
        setCurrentNickname(nickname);
        setNewNickname(nickname);
        fetchUser();
    }, [nickname]);

    const handleEditProfile = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        if (newNickname === currentNickname && !file) {
            alert("변경된 내용이 없습니다.");
            setIsLoading(false);
            return;
        }

        const token = getToken();
        if (!token) {
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("current_nickname", currentNickname);

        if (newNickname !== currentNickname) {
            formData.append("new_nickname", newNickname);
        }

        if (file) {
            formData.append("file", file);
        }

        try {
            const response = await fetch("/api/myPage/profile/edit", {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json(); // API에서 반환한 JSON 데이터 읽기
                throw new Error(errorData.message || "프로필 변경 실패");
            }

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
            setUser(kakaoId, name, newNickname, imgSrc);
            console.log("프로필 변경 성공: ", result);
            alert(result.message);
        } catch (error: any) {
            console.error("프로필 변경 중 오류 발생: ", error);
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <LoadingSpinner />}
            <div style={{ padding: "16px" }}>
                <Form onSubmit={handleEditProfile}>
                    <CustomProfileImageUploader
                        profileImage={imgSrc}
                        setFile={setFile}
                        setProfileImage={setImgSrc}
                    />
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
                        {errorMessage && (
                            <ErrorMessage>{errorMessage}</ErrorMessage>
                        )}
                    </NicknameContainer>
                    <NicknameContainer>
                        <h5>이름</h5>
                        <input type="text" value={name} disabled />
                    </NicknameContainer>
                    <SubmitButtonComponent text="수정 완료" />
                </Form>
            </div>
        </>
    );
}
