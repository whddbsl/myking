"use client";

import { PartyMyParticipatedDto } from "@/application/usecases/partyLookup/dto/PartyParticipatedDto";
import { getToken } from "@/utils/getToken";
import { useEffect, useState } from "react";
import { Container } from "../myCreated/page.styles";
import * as PC from "@/app/(anon)/parties/page.styles";
import styled from "styled-components";
import LoadingSpinner from "@/components/loadingSpinner/loadingSpineer";

const CustomProfileImage = styled(PC.ProfileImage)`
    img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        object-fit: cover;
    }
`;

export default function MyParticipatedPage() {
    const [partyList, setPartyList] = useState<PartyMyParticipatedDto[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchList = async () => {
            const token = getToken();
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch("/api/parties/participated", {
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
            } finally {
                setIsLoading(false);
            }
        };

        fetchList();
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            {partyList.length === 0 ? (
                <Container>
                    <div>아직 참여한 내역이 없습니다.</div>
                </Container>
            ) : (
                <PC.Cards>
                    {partyList.map((party) => (
                        <PC.Card key={party.party_id}>
                            <PC.ProfileSection>
                                <CustomProfileImage>
                                    <img
                                        src={party.user.profile_image}
                                        alt="profile_image"
                                    />
                                </CustomProfileImage>
                                <PC.ProfileInfo>
                                    <h1>{party.user.nickname}</h1>
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
                            </PC.LinkWrapper>

                            <PC.Footer>
                                <PC.EndDate>
                                    <h1>모집마감일</h1>
                                    <h2>D-{party.end_date}</h2>
                                </PC.EndDate>
                                <PC.State state={party.filter_state}>
                                    {party.current_members} /{" "}
                                    {party.max_members}
                                </PC.State>
                            </PC.Footer>
                        </PC.Card>
                    ))}
                </PC.Cards>
            )}
        </div>
    );
}
