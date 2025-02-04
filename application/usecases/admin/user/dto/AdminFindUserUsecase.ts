import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { AdminUserListDto } from "../AdminUserListDto";

function formatDate(date: Date): string {
    console.log(typeof date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const findAllUsers = async (
    repository: UserRepository
): Promise<AdminUserListDto[]> => {
    const users: User[] = await repository.getUsers();

    const userList: AdminUserListDto[] = await Promise.all(
        users.map(async (user) => ({
            user_id: user.user_id,
            name: user.name,
            nickname: user.nickname,
            created_at: formatDate(user.created_at),
        }))
    );

    return userList;
};
