"use client";

import { AdminMountainDto } from "@/application/usecases/adminMountain/dto/AdminMountainDto";
import { useEffect, useState } from "react";
import { Button, Main, Table, Td, Th, Tr, UnstyledLink } from "../user/page.styles";

const MountainPage = () => {
    const [mountains, setMountains] = useState<AdminMountainDto[]>([]);

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
        <Main>
            <Table>
                <thead>
                    <Tr>
                        <Th>아이디</Th>
                        <Th>산 이름</Th>
                        <Th>지역</Th>
                        <Th>설명</Th>
                        <Th>생성일</Th>
                        <Th>관리</Th>
                    </Tr>
                </thead>
                <tbody>
                    {mountains.map((mountain) => (
                        <Tr key={mountain.mountain_id}>
                            <Td>{mountain.mountain_id}</Td>
                            <Td>{mountain.name}</Td>
                            <Td>{mountain.region}</Td>
                            <Td>{mountain.description}</Td>
                            <Td>{mountain.created_at}</Td>
                            <Td>
                                <Button>수정</Button>
                                <Button
                                    onClick={() =>
                                        handleDelete(mountain.mountain_id)
                                    }
                                >
                                    삭제
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </tbody>
            </Table>
            <Button>
                <UnstyledLink href="/admin/mountain/create">산 추가</UnstyledLink>
            </Button>
        </Main>
    );
};

export default MountainPage;
