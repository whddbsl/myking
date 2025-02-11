"use client";
import * as PD from "./page.styles";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PartyDetailDto } from "@/application/usecases/partyLookup/dto/PartyDetailDto";
import { getToken } from "@/utils/getToken";
import { PartyCreatorIdDto } from "@/application/usecases/partyLookup/dto/PartyCreatorIdDto";

const PartyDetailPage: React.FC = () => {
    const [partyDetail, setPartyDetail] = useState<PartyDetailDto | null>(null);
    const [currentId, setCurrentId] = useState<PartyCreatorIdDto>({
        user_id: "",
    });
    const [isdisabled, setIsdisabled] = useState(false);
    const searchParams = useParams();
    const partyId = searchParams.partyId;

    useEffect(() => {
        const token = getToken();
        fetch(`/api/parties/${partyId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setPartyDetail(data.partyDetail); // partyDetail 저장
                setCurrentId(data.current_id); // current_id 저장
                console.log(data);
            });
    }, [partyId]);
    console.log(currentId.user_id);
    console.log(partyDetail);

    console.log(currentId.user_id === partyDetail?.creator_id);

    useEffect(() => {
        if (
            partyDetail?.filter_state !== "모집중" ||
            currentId?.user_id === partyDetail?.creator_id ||
            partyDetail?.user_id.includes(currentId.user_id)
        ) {
            setIsdisabled(true);
        } else {
            setIsdisabled(false);
        }
    }, [partyDetail, currentId]);

    const handleAddPartyMember = () => {
        fetch(`/api/parties/${partyId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                current_members: partyDetail?.current_members,
            }),
        });
        fetch(`/api/parties/${partyId}`, {
            method: "POST",
            headers: {
                // 담아서 보내는 데이터의 형태가 json
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: currentId.user_id,
            }), // 추후 user_id도 담아서 보내기
        });
        console.log(partyDetail?.user_id);
    };

    return (
        <PD.PartyDetailComponent>
            <PD.Card>
                <PD.ProfileSection>
                    <PD.ProfileImageWrap>
                        <PD.ProfileImage
                            src={partyDetail?.creator_image}
                            alt="프로필사진"
                        />
                    </PD.ProfileImageWrap>
                    <PD.ProfileInfo>
                        <h1>{partyDetail?.creator_nickname}</h1>
                        <h2>{partyDetail?.timeLabel}</h2>
                    </PD.ProfileInfo>
                </PD.ProfileSection>
                <PD.InfoSection>
                    <PD.Meeting>
                        <span>{partyDetail?.mountain_name}</span>
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
                    <PD.Paticipation
                        onClick={handleAddPartyMember}
                        disabled={isdisabled}
                    >
                        <div>
                            <span>참가하기 </span>
                            <span>
                                {partyDetail?.current_members}/
                                {partyDetail?.max_members}
                            </span>
                        </div>
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
