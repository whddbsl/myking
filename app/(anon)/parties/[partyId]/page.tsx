"use client";
import * as PD from "./page.styles";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PartyDetailDto } from "@/application/usecases/partyLookup/dto/PartyDetailDto";

const PartyDetailPage: React.FC = () => {
    const [partyDetail, setPartyDetail] = useState<PartyDetailDto | null>(null);
    const searchParams = useParams();
    const partyId = searchParams.partyId;
    useEffect(() => {
        fetch(`/api/parties/${partyId}`)
            .then((response) => response.json())
            .then((data) => setPartyDetail(data));
    }, [partyId]);

    const handleAddPartyMember = () => {
        fetch(`/api/parties/${partyId}`, {
            method: "POST",
            headers: {
                // 담아서 보내는 데이터의 형태가 json
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: "6219a949-5559-4a73-8ed0-34f065366dc0",
            }), // 추후 user_id도 담아서 보내기
        });
    };

    return (
        <PD.PartyDetailComponent>
            <PD.Card>
                <PD.ProfileSection>
                    <PD.ProfileImage>{/* 프로필 사진 */}</PD.ProfileImage>
                    <PD.ProfileInfo>
                        <h1>유저 닉네임</h1>
                        <h2>{partyDetail?.timeLabel}</h2>
                    </PD.ProfileInfo>
                </PD.ProfileSection>
                <PD.InfoSection>
                    <PD.Meeting>
                        <span>산이름</span>
                        <span>{partyDetail?.meeting_date}</span>
                    </PD.Meeting>
                    <PD.Tag>
                        <span>#{partyDetail?.max_members}명</span>
                        <span>#{partyDetail?.filter_gender}</span>
                        {partyDetail?.filter_age.map((age) => (
                            <span key={age}>#{age}</span>
                        ))}
                    </PD.Tag>
                </PD.InfoSection>
                <PD.Footer>
                    <PD.EndDate>
                        <h1>모집마감일</h1>
                        <h2>D-{partyDetail?.end_date}</h2>
                    </PD.EndDate>
                    <PD.Paticipation onClick={handleAddPartyMember}>
                        <span>참여하기</span>
                        <span>
                            {partyDetail?.current_members}/
                            {partyDetail?.max_members}
                        </span>
                    </PD.Paticipation>
                </PD.Footer>
            </PD.Card>
            <PD.MemberInfo>
                <h1>현재 참가자</h1>
                <div>
                    아직 참가자가 없어요.
                    <br />첫 참가자가 되어주세요!
                </div>
            </PD.MemberInfo>
        </PD.PartyDetailComponent>
    );
};
export default PartyDetailPage;
