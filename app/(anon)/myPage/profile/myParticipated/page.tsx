"use client";

import { PartyMyParticipatedDto } from "@/application/usecases/partyLookup/dto/PartyParticipatedDto";
import { getToken } from "@/utils/getToken";
import { useEffect, useState } from "react";
import { Container } from "../myCreated/page.styles";
import * as PC from "@/app/(anon)/parties/page.styles";
import styled from "styled-components";
import LoadingSpinner from "@/components/loadingSpinner/loadingSpinner";
import { PartyCreatorIdDto } from "@/application/usecases/partyLookup/dto/PartyCreatorIdDto";
import { MountainListDto } from "@/application/usecases/admin/course/dto/MountainListDto";

const CustomProfileImage = styled(PC.ProfileImage)`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
`;

interface StateProps {
    state: string;
}

const CustomState = styled(PC.State)<StateProps>`
    /* background-color: #e55555; */
    background-color: ${(props) =>
        props.state !== "기간 마감" ? "#e55555" : "#b0b0b0"};
    cursor: ${(props) => (props.state !== "기간 마감" ? "pointer" : "default")};
    pointer-events: ${(props) =>
        props.state !== "기간 마감" ? "auto" : "none"};
`;

export default function MyParticipatedPage() {
    const [partyList, setPartyList] = useState<PartyMyParticipatedDto[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentId, setCurrentId] = useState<PartyCreatorIdDto>({
        user_id: "",
    });
    const [mountainList, setMountainList] = useState<MountainListDto[]>([]);

    useEffect(() => {
        const fetchList = async () => {
            const token = getToken();
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    "/api/myPage/profile/myParticipated",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error(
                        "내가 참여한 파티 목록을 가져오는 데 실패했습니다."
                    );
                }

                const data = await response.json();
                setPartyList(data.myParticipatedList);
                setCurrentId(data.currentId.user_id);
                setMountainList(data.mountainDetails);
                console.log(data);
            } catch (error: any) {
                console.error("내가 생성한 파티 목록 가져오기 실패: ", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchList();
    }, []);

    console.log("id", currentId);

    const handleDeleteMember = async (
        current_members: number,
        party_id: number
    ) => {
        if (!confirm("참가를 취소하시겠습니까?")) return;

        try {
            const putResponse = await fetch(
                `/api/myPage/profile/myParticipated`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        party_id: party_id,
                        current_members: current_members,
                    }),
                }
            );

            if (!putResponse.ok) {
                throw new Error("참가 인원 업데이트 중 오류가 발생했습니다.");
            }

            const DeleteResponse = await fetch(
                `/api/myPage/profile/myParticipated`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        party_id: party_id,
                        user_id: currentId,
                    }),
                }
            );

            if (!DeleteResponse.ok) {
                throw new Error("참가 정보 삭제 중 오류가 발생했습니다.");
            }

            setPartyList((prevList) =>
                prevList.filter(
                    (party) => party.party_id !== party_id.toString()
                )
            );

            alert("참가 취소가 완료되었습니다.");
        } catch (error) {
            console.error("Error:", error);
            alert("참가 정보 삭제 중 오류가 발생했습니다.");
        }
    };

    return (
        <>
            {isLoading && <LoadingSpinner />}
            {partyList === null && <LoadingSpinner />}
            {partyList.length === 0 ? (
                <Container>
                    <div>아직 참여한 내역이 없습니다.</div>
                </Container>
            ) : (
                <PC.Cards style={{ padding: "16px" }}>
                    {partyList.map((party, index) => {
                        const endDate = new Date(party.end_day);
                        const isExpired = endDate < new Date();

                        return (
                            <PC.Card key={party.party_id}>
                                <PC.ProfileSection>
                                    <PC.ProfileImageWrap>
                                        <CustomProfileImage
                                            src={party.user.profile_image}
                                            alt="profile_image"
                                        />
                                    </PC.ProfileImageWrap>
                                    <PC.ProfileInfo>
                                        <h1>{party.user.nickname}</h1>
                                        <h2>{party.timeLabel}</h2>
                                    </PC.ProfileInfo>
                                </PC.ProfileSection>
                                <PC.LinkWrapper
                                    href={`/parties/${party.party_id}`}
                                >
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
                                    <CustomState
                                        state={
                                            isExpired
                                                ? "기간 마감"
                                                : party.filter_state
                                        }
                                        onClick={() => {
                                            if (!isExpired) {
                                                handleDeleteMember(
                                                    party.current_members,
                                                    Number(party.party_id)
                                                );
                                            }
                                        }}
                                    >
                                        취소하기
                                    </CustomState>
                                </PC.Footer>
                            </PC.Card>
                        );
                    })}
                </PC.Cards>
            )}
        </>
    );
}
