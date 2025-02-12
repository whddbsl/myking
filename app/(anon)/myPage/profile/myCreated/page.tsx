"use client";

import * as PC from "@/app/(anon)/parties/page.styles";
import { getToken } from "@/utils/getToken";
import { useEffect, useState } from "react";
import { PartyMyCreatedDto } from "@/application/usecases/partyLookup/dto/PartyMyCreatedDto";
import { useUserStore } from "@/application/states/userStore";
import styled from "styled-components";
import { Container } from "./page.styles";
import LoadingSpinner from "@/components/loadingSpinner/loadingSpinner";
import { MountainListDto } from "@/application/usecases/admin/course/dto/MountainListDto";

const CustomProfileImage = styled(PC.ProfileImage)`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
`;

export default function MyCreatedPage() {
    const [partyList, setPartyList] = useState<PartyMyCreatedDto[]>([]);
    const [mountainList, setMountainList] = useState<MountainListDto[]>([]);
    const { nickname, profileImage } = useUserStore();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchList = async () => {
            const token = getToken();
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch("/api/myPage/profile/myCreated", {
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
                setPartyList(data.myCreatedList);
                setMountainList(data.mountainDetails);
            } catch (error: any) {
                console.error("내가 생성한 파티 목록 가져오기 실패: ", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchList();
    }, []);

    const handleDelete = async (partyId: string) => {
        const confirmDelete = confirm("이 글을 삭제하시겠습니까?");
        if (!confirmDelete) return;

        const token = getToken();
        if (!token) return;

        try {
            const response = await fetch(`/api/myPage/profile/myCreated`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ partyId }),
            });

            if (!response.ok) {
                throw new Error("파티 삭제에 실패했습니다.");
            }

            // 삭제 성공 시 파티 목록에서 해당 파티 제거
            setPartyList((prevList) =>
                prevList.filter((party) => party.party_id !== partyId)
            );
        } catch (error: any) {
            console.error("파티 삭제 실패: ", error);
        }
    };

    return (
        <>
            {isLoading && <LoadingSpinner />}
            {partyList.length === 0 ? (
                <Container>
                    <div>아직 작성한 글이 없습니다.</div>
                </Container>
            ) : (
                <PC.Cards style={{ padding: "16px" }}>
                    {partyList.map((party, index) => (
                        <PC.Card key={party.party_id}>
                            <PC.ProfileSection>
                                <PC.ProfileImageWrap>
                                    <CustomProfileImage
                                        src={profileImage}
                                        alt="profile_image"
                                    />
                                </PC.ProfileImageWrap>
                                <PC.ProfileInfo>
                                    <h1>{nickname}</h1>
                                    <h2>{party.timeLabel}</h2>
                                </PC.ProfileInfo>
                                <PC.ActionButtons>
                                    <button
                                        style={{ color: "#7e7e7e" }}
                                        onClick={() =>
                                            handleDelete(party.party_id)
                                        }
                                    >
                                        삭제
                                    </button>
                                </PC.ActionButtons>
                            </PC.ProfileSection>
                            <PC.LinkWrapper href={`/parties/${party.party_id}`}>
                                <PC.InfoSection>
                                    <PC.Meeting>
                                        <span>
                                            {mountainList[index]?.name ||
                                                "알 수 없음"}
                                        </span>
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
        </>
    );
}
