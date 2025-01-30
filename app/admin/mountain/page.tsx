"use client";

import { AdminMountainListDto } from "@/application/usecases/adminMountain/dto/AdminMountainListDto";
import { useEffect, useState } from "react";
import * as Mountain from "../user/page.styles";
import { CreateButton } from "./page.styles";

const MountainPage = () => {
    const [mountains, setMountains] = useState<AdminMountainListDto[]>([]);

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
                        (mountain) => mountain.mountain_id !== mountainId
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
        <Mountain.Main>
            <Mountain.Table>
                <thead>
                    <Mountain.Tr>
                        <Mountain.Th>아이디</Mountain.Th>
                        <Mountain.Th>산 이름</Mountain.Th>
                        <Mountain.Th>지역</Mountain.Th>
                        <Mountain.Th>설명</Mountain.Th>
                        <Mountain.Th>생성일</Mountain.Th>
                        <Mountain.Th>관리</Mountain.Th>
                    </Mountain.Tr>
                </thead>
                <tbody>
                    {mountains.map((mountain) => (
                        <Mountain.Tr key={mountain.mountain_id}>
                            <Mountain.Td>{mountain.mountain_id}</Mountain.Td>
                            <Mountain.Td>{mountain.name}</Mountain.Td>
                            <Mountain.Td>{mountain.region}</Mountain.Td>
                            <Mountain.Td>{mountain.description}</Mountain.Td>
                            <Mountain.Td>{mountain.created_at}</Mountain.Td>
                            <Mountain.Td>
                                <Mountain.Button>
                                    <Mountain.UnstyledLink
                                        href={`/admin/mountain/${mountain.mountain_id}/edit`}
                                    >
                                        수정
                                    </Mountain.UnstyledLink>
                                </Mountain.Button>
                                <Mountain.Button
                                    onClick={() =>
                                        handleDelete(mountain.mountain_id)
                                    }
                                >
                                    삭제
                                </Mountain.Button>
                            </Mountain.Td>
                        </Mountain.Tr>
                    ))}
                </tbody>
            </Mountain.Table>
            <CreateButton>
                <Mountain.UnstyledLink href="/admin/mountain/create">
                    산 추가
                </Mountain.UnstyledLink>
            </CreateButton>
        </Mountain.Main>
    );
};

export default MountainPage;
