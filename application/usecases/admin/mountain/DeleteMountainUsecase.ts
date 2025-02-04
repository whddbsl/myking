import { MountainRepository } from "@/domain/repositories/MountainRepository";

export const deleteMountain = async (
    repository: MountainRepository,
    mountainId: string
): Promise<void> => {
    await repository.deleteMountain(mountainId);
};
