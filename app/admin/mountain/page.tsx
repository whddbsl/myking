// app/admin/mountain/page.tsx
"use client";

import { Mountain } from "@/domain/entities/Mountain";
import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import * as S from "./page.styles";
import Loading from "@/app/loading";

const AdminMountainPage = () => {
    const [mountains, setMountains] = useState<Mountain[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMountains = async () => {
            try {
                const response = await fetch("/api/admin/mountain");
                const data = await response.json();
                setMountains(data);
            } catch (error) {
                console.error("Error fetching mountains:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMountains();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    const handleDelete = async (mountainId: string) => {
        if (!confirm("정말로 이 산을 삭제하시겠습니까?")) return;

        try {
            const response = await fetch("/api/admin/mountain", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ mountainId: mountainId }),
            });

            if (response.ok) {
                setMountains((prevList) =>
                    prevList.filter(
                        (mountain) =>
                            mountain.mountain_id !== Number(mountainId)
                    )
                );
            } else {
                alert("산 삭제 중 오류가 발생했습니다.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("산 삭제 중 오류가 발생했습니다.");
        }
    };

    return (
        <S.AdminContainer>
            <S.ContentWrapper>
                <S.Header>
                    <div>
                        <S.Title>산 관리</S.Title>
                        <p>총 {mountains.length}개의 산이 등록되어 있습니다.</p>
                    </div>
                    <S.AddButton href="/admin/mountain/create">
                        <FiPlus size={20} />
                        새로운 산 등록
                    </S.AddButton>
                </S.Header>

                <S.Table>
                    <S.Thead>
                        <S.Tr>
                            <S.Th>아이디</S.Th>
                            <S.Th>이미지</S.Th>
                            <S.Th>산 이름</S.Th>
                            <S.Th>지역</S.Th>
                            <S.Th>고도</S.Th>
                            <S.Th>설명</S.Th>
                            <S.Th>등록일</S.Th>
                            <S.Th>관리</S.Th>
                        </S.Tr>
                    </S.Thead>
                    <S.Tbody>
                        {mountains.map((mountain) => (
                            <S.Tr key={mountain.mountain_id}>
                                <S.Td>{mountain.mountain_id}</S.Td>
                                <S.Td>
                                    <S.ImagePreview>
                                        <S.Image
                                            src={mountain.image_url}
                                            alt={mountain.name}
                                        />
                                    </S.ImagePreview>
                                </S.Td>
                                <S.Td>{mountain.name}</S.Td>
                                <S.Td>
                                    <S.Badge className="region">
                                        {mountain.region}
                                    </S.Badge>
                                </S.Td>
                                <S.Td>
                                    <S.Badge className="altitude">
                                        {mountain.altitude}m
                                    </S.Badge>
                                </S.Td>
                                <S.TdDescription>
                                    {mountain.description}
                                </S.TdDescription>

                                <S.Td>{mountain.created_at.toString()}</S.Td>
                                <S.Td>
                                    <S.ActionWrapper>
                                        <S.ActionButton className="edit">
                                            <S.UnstyledLink
                                                href={`/admin/mountain/${mountain.mountain_id}/edit`}
                                            >
                                                <FiEdit2 size={18} />
                                            </S.UnstyledLink>
                                        </S.ActionButton>
                                        <S.ActionButton
                                            className="delete"
                                            onClick={() =>
                                                handleDelete(
                                                    mountain.mountain_id.toString()
                                                )
                                            }
                                            aria-label="삭제"
                                        >
                                            <FiTrash2 size={18} />
                                        </S.ActionButton>
                                    </S.ActionWrapper>
                                </S.Td>
                            </S.Tr>
                        ))}
                    </S.Tbody>
                </S.Table>
            </S.ContentWrapper>
        </S.AdminContainer>
    );
};

export default AdminMountainPage;
