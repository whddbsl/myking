"use client";

import { PartyListDto } from "@/application/usecases/admin/party/dto/PartyListDto";
import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp, FiPlus } from "react-icons/fi";
import * as S from "./page.styles";

const PartyPage = () => {
    const [parties, setParties] = useState<PartyListDto[]>([]);
    const [detailStates, setDetailStates] = useState<{
        [key: string]: boolean;
    }>({});

    useEffect(() => {
        fetch("/api/admin/party")
            .then((response) => response.json())
            .then((data) => setParties(data));
    }, []);

    const handleDetail = (id: number) => {
        setDetailStates((prevStates) => ({
            ...prevStates,
            [id]: !prevStates[id],
        }));
    };

    return (
        <S.AdminContainer>
            <S.ContentWrapper>
                <S.Header>
                    <div>
                        <S.Title>파티 관리</S.Title>
                        <p>총 {parties.length}개의 파티가 등록되어 있습니다.</p>
                    </div>
                    <S.AddButton href="/admin/party/create">
                        <FiPlus size={20} />
                        새로운 파티 등록
                    </S.AddButton>
                </S.Header>

                <S.Table>
                    <S.Thead>
                        <S.Tr>
                            <S.Th>아이디</S.Th>
                            <S.Th>산 이름</S.Th>
                            <S.Th>설명</S.Th>
                            <S.Th>현재 인원</S.Th>
                            <S.Th>최대 인원</S.Th>
                            <S.Th>만나는 날짜</S.Th>
                            <S.Th>종료 날짜</S.Th>
                            <S.Th>관리</S.Th>
                        </S.Tr>
                    </S.Thead>
                    <S.Tbody>
                        {parties.map((party) => (
                            <React.Fragment key={party.party_id}>
                                <S.Tr>
                                    <S.Td>{party.party_id}</S.Td>
                                    <S.Td>{party.mountain_name}</S.Td>
                                    <S.Td>{party.description}</S.Td>
                                    <S.Td>{party.current_members}</S.Td>
                                    <S.Td>{party.max_members}</S.Td>
                                    <S.Td>{party.meeting_date}</S.Td>
                                    <S.Td>{party.end_date}</S.Td>
                                    <S.Td>
                                        <S.ActionButton
                                            className="detail"
                                            onClick={() =>
                                                handleDetail(party.party_id)
                                            }
                                            aria-label="상세보기"
                                        >
                                            {detailStates[party.party_id] ? (
                                                <FiChevronUp size={18} />
                                            ) : (
                                                <FiChevronDown size={18} />
                                            )}
                                        </S.ActionButton>
                                    </S.Td>
                                </S.Tr>
                                {detailStates[party.party_id] && (
                                    <S.Tr>
                                        <S.Td colSpan={8}>
                                            <S.DetailContainer>
                                                <S.DetailText>
                                                    <ul>
                                                        <li>
                                                            만나는 날짜:{" "}
                                                            {party.meeting_date}
                                                        </li>
                                                        <li>
                                                            종료 날짜:{" "}
                                                            {party.end_date}
                                                        </li>
                                                        <li>
                                                            성별:{" "}
                                                            {
                                                                party.filter_gender
                                                            }
                                                        </li>
                                                        <li>
                                                            생성자:{" "}
                                                            {party.creator_id}
                                                        </li>
                                                        <li>
                                                            참여자:{" "}
                                                            {party.participants
                                                                .map(
                                                                    (
                                                                        participant
                                                                    ) =>
                                                                        participant.nickname
                                                                )
                                                                .join(", ")}
                                                        </li>
                                                    </ul>
                                                </S.DetailText>
                                            </S.DetailContainer>
                                        </S.Td>
                                    </S.Tr>
                                )}
                            </React.Fragment>
                        ))}
                    </S.Tbody>
                </S.Table>
            </S.ContentWrapper>
        </S.AdminContainer>
    );
};

export default PartyPage;
