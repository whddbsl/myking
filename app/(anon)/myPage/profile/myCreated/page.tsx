"use client";

import { useUserStore } from "@/application/states/userStore";
import Filter from "@/components/party/filter/Filter";
import * as PC from "@/app/(anon)/parties/page.styles";
import { getToken } from "@/utils/getToken";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PartyMyCreatedDto } from "@/application/usecases/partyLookup/dto/PartyMyCreatedDto";

export default function MyCreatedPage() {
    const [partyList, setPartyList] = useState<PartyMyCreatedDto[]>([]);

    useEffect(() => {
        const fetchList = async () => {
            const token = getToken();
            if (!token) return;

            try {
                const response = await fetch("/api/parties/myCreated", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error(
                        "내가 참여한 파티 목록을 가져오는 데 실패했습니다."
                    );
                }

                const data = await response.json();
                setPartyList(data);
            } catch (error: any) {
                console.error("내가 생성한 파티 목록 가져오기 실패: ", error);
            }
        };
        fetchList();
    }, []);

    return (
        <div>
            <PC.Cards>
                {partyList.map((party) => (
                    <PC.Card key={party.party_id}>
                        <PC.ProfileSection>
                            <PC.ProfileImage>
                                {/* 프로필 사진 */}
                            </PC.ProfileImage>
                            <PC.ProfileInfo>
                                <h1>유저 닉네임</h1>
                                <h2>{party.timeLabel}</h2>
                            </PC.ProfileInfo>
                        </PC.ProfileSection>
                        <PC.LinkWrapper href={`/parties/${party.party_id}`}>
                            <PC.InfoSection>
                                <PC.Meeting>
                                    <span>산이름</span>
                                    <span>{party.meeting_date}</span>
                                </PC.Meeting>
                                <PC.Tag>
                                    <span>#{party.max_members}명</span>
                                    <span>#{party.filter_gender}</span>
                                    {party.filter_age.map((age) => (
                                        <span key={age}>#{age}</span>
                                    ))}
                                </PC.Tag>
                            </PC.InfoSection>

                            <PC.Footer>
                                <PC.EndDate>
                                    <h1>모집마감일</h1>
                                    <h2>D-{party.end_date}</h2>
                                </PC.EndDate>
                                {party.filter_state && (
                                    <PC.State state={party.filter_state}>
                                        {party.filter_state}
                                    </PC.State>
                                )}
                            </PC.Footer>
                        </PC.LinkWrapper>
                    </PC.Card>
                ))}
            </PC.Cards>
            <PC.CreateButton>
                <Link href={`/parties/create`}>작성하기</Link>
            </PC.CreateButton>
        </div>
    );
}
