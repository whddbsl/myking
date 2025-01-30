import { AdminMountainRepository } from "@/domain/repositories/AdminMountainRepository";

export const deleteMountain = async (
    repository: AdminMountainRepository,
    mountainId: string
): Promise<void> => {
    await repository.deleteMountain(mountainId);
}