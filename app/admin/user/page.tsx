"use client";

import { useEffect, useState } from "react";
import { AdminUserListDto } from "@/application/usecases/admin/user/AdminUserListDto";
import { Table, Th, Td, Tr, Button, Main } from "./page.styles";

const UserPage = () => {
    const [userList, setUserList] = useState<AdminUserListDto[]>([]);

    useEffect(() => {
        fetch("/api/admin/user")
            .then((response) => response.json())
            .then((data) => setUserList(data));
    }, []);

    const handleDelete = async (userId: string) => {
        try {
            const response = await fetch("/api/admin/user", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: userId }),
            });

            if (response.ok) {
                setUserList((prevList) =>
                    prevList.filter((user) => user.user_id !== userId)
                );
            } else {
                console.error("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };
    console.log(userList);

    return (
        <Main>
            <Table>
                <thead>
                    <Tr>
                        <Th>아이디</Th>
                        <Th>이름</Th>
                        <Th>닉네임</Th>
                        <Th>가입일</Th>
                        <Th>관리</Th>
                    </Tr>
                </thead>
                <tbody>
                    {userList.map((user) => (
                        <Tr key={user.user_id}>
                            <Td>{user.user_id}</Td>
                            <Td>{user.name}</Td>
                            <Td>{user.nickname}</Td>
                            <Td>{user.created_at}</Td>
                            <Td>
                                <Button
                                    onClick={() => handleDelete(user.user_id)}
                                >
                                    삭제
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </tbody>
            </Table>
        </Main>
    );
};

export default UserPage;
