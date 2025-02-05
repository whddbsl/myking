import { UserRepository } from "@/domain/repositories/UserRepository";

export const deleteUser = async (
    repository: UserRepository,
    userId: string
): Promise<void> => {
    await repository.deleteUser(userId);
};
