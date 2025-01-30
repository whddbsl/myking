import { AdminMountainRepository } from "@/domain/repositories/AdminMountainRepository";
import { AdminMountainCreate } from "@/domain/entities/AdminMountainCreate";

export const createNewMountain = async (
    mountainRepository: AdminMountainRepository,
    mountain: AdminMountainCreate
): Promise<void> => {
    await mountainRepository.createMountain(mountain);
};
