"use client";
import { PartyComponent } from "./page.styles";
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

    console.log("나와", partyList);
    return (
        <div>
            <PartyComponent>
                <Filter />
                <div>
                    {partyList.map((party) => (
                        <div key={party.party_id}>
                            <div>
                                <div>
                                    <div>유저 프로필</div>
                                    <div>
                                        <p>유저 닉네임</p>
                                        <p>{party.timeLabel}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p>산이름</p>
                                        <p>{party.meeting_date}</p>
                                    </div>
                                    <div>
                                        <span>{party.max_members}</span>
                                        <span>{party.filter_gender}</span>
                                        <span>{party.filter_age}</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p>모집마감일</p>
                                        <p>D-{party.end_date}</p>
                                    </div>
                                    <div>
                                        <p>{party.filter_state}</p>
                                    </div>
                                </div>
                            </div>
                            <Link href={`/parties/${party.party_id}`}>
                                details로 이동
                            </Link>
                        </div>
                    ))}
                </div>
                <div>
                    <button>작성하기</button>
                </div>
            </PartyComponent>
        </div>
    );
};

export default PartyPage;
