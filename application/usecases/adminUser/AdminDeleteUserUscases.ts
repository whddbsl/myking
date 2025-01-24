import { AdminUserRepository } from "@/domain/repositories/AdminUserRepository";

export const deleteUser = async (
    repository: AdminUserRepository,
    userId: string
): Promise<void> => {
    await repository.deleteUser(userId);
}