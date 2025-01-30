import { AdminMountainUpdate } from "@/domain/entities/AdminMountainUpdate";
import { AdminMountainRepository } from "@/domain/repositories/AdminMountainRepository";

export const updateMountain = async (
    mountainRepository: AdminMountainRepository,
    mountain: AdminMountainUpdate
): Promise<void> => {
    await mountainRepository.updateMountain(mountain);
};
