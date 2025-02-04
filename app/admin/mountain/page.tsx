"use client";

import { Mountain } from "@/domain/entities/Mountain";
import { useEffect, useState } from "react";
import * as Mountains from "../user/page.styles";
import { CreateButton } from "./page.styles";

const MountainPage = () => {
    const [mountains, setMountains] = useState<Mountain[]>([]);

    useEffect(() => {
        fetch("/api/admin/mountain")
            .then((response) => response.json())
            .then((data) => setMountains(data));
    }, []);

    const handleDelete = async (mountainId: string) => {
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
                        (mountain) => mountain.mountain_id !== Number(mountainId)
                    )
                );
            } else {
                console.error("Failed to delete mountain", response);
            }
        } catch (error) {
            console.error("Error deleting mountain:", error);
        }
    };

    return (
        <Mountains.Main>
            <Mountains.Table>
                <thead>
                    <Mountains.Tr>
                        <Mountains.Th>아이디</Mountains.Th>
                        <Mountains.Th>산 이름</Mountains.Th>
                        <Mountains.Th>이미지</Mountains.Th>
                        <Mountains.Th>지역</Mountains.Th>
                        <Mountains.Th>설명</Mountains.Th>
                        <Mountains.Th>고도</Mountains.Th>
                        <Mountains.Th>생성일</Mountains.Th>
                        <Mountains.Th>관리</Mountains.Th>
                    </Mountains.Tr>
                </thead>
                <tbody>
                    {mountains.map((mountain) => (
                        <Mountains.Tr key={mountain.mountain_id}>
                            <Mountains.Td>{mountain.mountain_id}</Mountains.Td>
                            <Mountains.Td>{mountain.name}</Mountains.Td>
                            <Mountains.Td>{mountain.image_url}</Mountains.Td>
                            <Mountains.Td>{mountain.region}</Mountains.Td>
                            <Mountains.Td>{mountain.description}</Mountains.Td>
                            <Mountains.Td>{mountain.altitude}</Mountains.Td>
                            <Mountains.Td>
                                {mountain.created_at.toString()}
                            </Mountains.Td>
                            <Mountains.Td>
                                <Mountains.Button>
                                    <Mountains.UnstyledLink
                                        href={`/admin/mountain/${mountain.mountain_id}/edit`}
                                    >
                                        수정
                                    </Mountains.UnstyledLink>
                                </Mountains.Button>
                                <Mountains.Button
                                    onClick={() =>
                                        handleDelete(mountain.mountain_id.toString())
                                    }
                                >
                                    삭제
                                </Mountains.Button>
                            </Mountains.Td>
                        </Mountains.Tr>
                    ))}
                </tbody>
            </Mountains.Table>
            <CreateButton>
                <Mountains.UnstyledLink href="/admin/mountain/create">
                    산 추가
                </Mountains.UnstyledLink>
            </CreateButton>
        </Mountains.Main>
    );
};

export default MountainPage;
