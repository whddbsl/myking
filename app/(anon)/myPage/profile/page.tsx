"use client";

import React from "react";
import * as PC from "./page.styles";
import LevelInfo from "@/components/user/userLevel/level";
import PartyButton from "@/components/user/partyButton/party";
import { useRouter } from "next/navigation";
import ProfileLayout from "./layout";

export default function Profile() {
    const router = useRouter();
    return (
        <>
            <PC.ProfileContainer>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <img
                        src="/images/member_default.svg"
                        alt="profile"
                        style={{ width: "55px", height: "55px" }}
                    />
                    <div>
                        <PC.H4>이름</PC.H4>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                cursor: "pointer",
                            }}
                            onClick={() => router.push("/myPage/profile/edit")}
                        >
                            <PC.ProfileInfo>내 정보 확인</PC.ProfileInfo>
                            <img src="/images/right_arrow.svg" alt="button" />
                        </div>
                    </div>
                </div>
                <LevelInfo />
            </PC.ProfileContainer>
            <PC.H4 style={{ padding: "8px 0", marginTop: "24px" }}>
                등산 메이트 모집 현황
            </PC.H4>
            <PartyButton text="내가 올린 파티" />
            <PartyButton text="내가 참여한 파티" />
        </>
    );
}
