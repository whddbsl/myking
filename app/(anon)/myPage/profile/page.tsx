"use client";

import React, { useEffect, useState } from "react";
import * as PC from "./page.styles";
import LevelInfo from "@/components/user/userLevel/level";
import PartyButton from "@/components/user/partyButton/party";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/application/states/userStore";
import { getToken } from "@/utils/getToken";
import LoadingSpinner from "@/components/loadingSpinner/loadingSpinner";

export default function Profile() {
    const router = useRouter();
    const { setUser } = useUserStore();
    const [nickname, setNickname] = useState<string>("");
    const [imgSrc, setImgSrc] = useState<string>("/images/member_default.svg");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = getToken();
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch("/api/myPage/profile", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    alert("로그인되어 있지 않습니다.");
                    router.push("/auth");
                    throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
                }

                const data = await response.json();
                setUser(
                    data.kakao_id,
                    data.name,
                    data.nickname,
                    data.profile_image
                );
                setNickname(data.nickname);
                setImgSrc(data.profile_image);
            } catch (error: any) {
                console.error("사용자 정보 가져오기 실패: ", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);

    return (
        <>
            {isLoading && <LoadingSpinner />}
            <div style={{ padding: "16px" }}>
                <PC.ProfileContainer>
                    <div>
                        <PC.ProfileImage
                            id="profile-image"
                            src={imgSrc}
                            alt="profile"
                        />
                        <div id="nickname-container">
                            <PC.H4>{nickname}</PC.H4>
                            <div
                                onClick={() =>
                                    router.push("/myPage/profile/edit")
                                }
                            >
                                <PC.ProfileInfo>내 정보 확인</PC.ProfileInfo>
                                <PC.ArrowImage
                                    src="/images/right_arrow.svg"
                                    alt="button"
                                />
                            </div>
                        </div>
                    </div>
                    <LevelInfo />
                </PC.ProfileContainer>
                <PC.H4 style={{ padding: "8px 0", marginTop: "24px" }}>
                    등산 메이트 모집 현황
                </PC.H4>
                <PartyButton
                    text="내가 올린 파티"
                    route="/myPage/profile/myCreated"
                />
                <PartyButton
                    text="내가 참여한 파티"
                    route="/myPage/profile/myParticipated"
                />
            </div>
        </>
    );
}
