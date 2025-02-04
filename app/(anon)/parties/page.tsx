"use client";
import * as PC from "./page.styles";
import Filter from "../../../components/party/filter/Filter";
import { useState, useEffect } from "react";
import { PartyListDto } from "@/application/usecases/partyLookup/dto/PartyListDto";
import Link from "next/link";

const PartyPage: React.FC = () => {
    const [partyList, setPartyList] = useState<PartyListDto[]>([]);

    useEffect(() => {
        fetch("/api/parties")
            .then((response) => response.json())
            .then((data) => setPartyList(data));
    }, []);

    return (
        <div>
            <Filter />
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
};

export default PartyPage;
