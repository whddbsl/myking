"use client";
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

    return (
        <div>
            <div>
                <div>
                    <div>유저 프로필</div>
                    <div>
                        <p>유저 닉네임</p>
                        <p>{partyDetail?.timeLabel}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <p>산이름</p>
                        <p>{partyDetail?.meeting_date}</p>
                    </div>
                    <div>
                        <p>{partyDetail?.description}</p>
                    </div>
                    <div>
                        <span>{partyDetail?.max_members}</span>
                        <span>{partyDetail?.filter_gender}</span>
                        <span>{partyDetail?.filter_age}</span>
                    </div>
                </div>
                <div>
                    <div>
                        <p>모집마감일</p>
                        <p>D-{partyDetail?.end_date}</p>
                    </div>
                    <div>
                        <span>참여하기</span>
                        <span>
                            {partyDetail?.current_members}/
                            {partyDetail?.max_members}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PartyDetailPage;
