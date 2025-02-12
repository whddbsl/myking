"use client";

import { useEffect, useState } from "react";
import { AdminUserListDto } from "@/application/usecases/admin/user/AdminUserListDto";
import * as S from "./page.styles";
import { FiPlus, FiTrash2 } from "react-icons/fi";

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

    return (
        <S.AdminContainer>
            <S.ContentWrapper>
                <S.Header>
                    <div>
                        <S.Title>유저 관리</S.Title>
                        <p>
                            총 {userList.length}명의 사용자가 등록되어 있습니다.
                        </p>
                    </div>
                </S.Header>

                <S.Table>
                    <S.Thead>
                        <S.Tr>
                            <S.Th>아이디</S.Th>
                            <S.Th>이름</S.Th>
                            <S.Th>닉네임</S.Th>
                            <S.Th>가입일</S.Th>
                            <S.Th>관리</S.Th>
                        </S.Tr>
                    </S.Thead>
                    <S.Tbody>
                        {userList.map((user) => (
                            <S.Tr key={user.user_id}>
                                <S.Td>{user.user_id}</S.Td>
                                <S.Td>{user.name}</S.Td>
                                <S.Td>{user.nickname}</S.Td>
                                <S.Td>{user.created_at}</S.Td>
                                <S.Td>
                                    <S.ActionButton
                                        onClick={() =>
                                            handleDelete(user.user_id)
                                        }
                                        aria-label="삭제"
                                    >
                                        <FiTrash2 size={18} />
                                    </S.ActionButton>
                                </S.Td>
                            </S.Tr>
                        ))}
                    </S.Tbody>
                </S.Table>
            </S.ContentWrapper>
        </S.AdminContainer>
    );
};

export default UserPage;
