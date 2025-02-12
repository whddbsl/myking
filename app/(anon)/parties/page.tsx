"use client";
import * as PC from "./page.styles";
import Filter from "../../../components/party/filter/Filter";
import { useState, useEffect, useRef } from "react";
import { PartyListDto } from "@/application/usecases/partyLookup/dto/PartyListDto";
import { MountainListDto } from "@/application/usecases/partyLookup/dto/MountainListDto";
import { useFilterStore } from "@/application/states/useFilterStore";

const PartyPage: React.FC = () => {
    const { filters, resetFilters } = useFilterStore();

    useEffect(() => {
        // 페이지가 마운트될 때 상태 초기화
        resetFilters();
    }, [resetFilters]);

    const [isOpen, setIsOpen] = useState(false);
    const [partyList, setPartyList] = useState<PartyListDto[]>([]);
    const [mountainList, setMountainList] = useState<MountainListDto[]>([]);

    // 최초 렌더링인지 확인하기 위한 ref
    const isFirstRender = useRef(true);

    // 최초 마운트 시 전체 데이터를 가져옵니다.
    useEffect(() => {
        fetch(`/api/parties`)
            .then((response) => response.json())
            .then((data) => {
                setPartyList(data.partyList);
                setMountainList(data.mountainList);
            });
    }, []);

    // 필터 값이 변경되면 필터링된 데이터를 가져옵니다.
    useEffect(() => {
        // 최초 렌더링 시에는 이미 전체 데이터를 가져왔으므로 건너뜁니다.
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // 필터 값들을 쿼리 스트링으로 변환합니다.
        const query = new URLSearchParams({
            mountain_id: filters.mountain_id.toString(),
            filter_state: filters.filter_state,
            filter_gender: filters.filter_gender.join(","),
            filter_age: filters.filter_age.join(","),
        }).toString();

        fetch(`/api/parties?${query}`)
            .then((response) => response.json())
            .then((data) => {
                setPartyList(data.partyList);
                setMountainList(data.mountainList);
            });
    }, [filters]);

    // 현재 선택된 산 이름
    const selectedMountain = mountainList.find(
        (mountain) => mountain.mountain_id === filters.mountain_id
    )?.mountain_name;

    const handleFilterOpen = () => {
        setIsOpen(!isOpen);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <div>
                <button onClick={handleFilterOpen}>필터</button>
                {filters.mountain_id !== 0 && <div>{selectedMountain}</div>}
                <div>{filters.filter_state}</div>
                <div>{filters.filter_gender}</div>
                <div>{filters.filter_age.join(", ")}</div>
            </div>

            {isOpen && (
                <Filter mountainList={mountainList} onClose={closeModal} />
            )}

            {partyList.length === 0 ? (
                <div style={{ margin: "20px", textAlign: "center" }}>
                    조건에 맞는 파티가 없습니다
                </div>
            ) : (
                <PC.Cards>
                    {partyList.map((party) => (
                        <PC.Card key={party.party_id}>
                            <PC.ProfileSection>
                                <PC.ProfileImageWrap>
                                    <PC.ProfileImage
                                        src={party.creator_image}
                                        alt="프로필사진"
                                    />
                                </PC.ProfileImageWrap>
                                <PC.ProfileInfo>
                                    <h1>{party.creator_nickname}</h1>
                                    <h2>{party.timeLabel}</h2>
                                </PC.ProfileInfo>
                            </PC.ProfileSection>
                            <PC.LinkWrapper href={`/parties/${party.party_id}`}>
                                <PC.InfoSection>
                                    <PC.Meeting>
                                        <span>{party.mountain_name}</span>
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
            )}

            <PC.CreateButton href={`/parties/create`}>작성하기</PC.CreateButton>
        </div>
    );
};

export default PartyPage;
