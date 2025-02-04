import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { AdminMountainNameDto } from "./dto/AdminMountainNameDto";

export const findMountainName = async (
    mountainRepository: MountainRepository
): Promise<AdminMountainNameDto[]> => {
    const mountains = await mountainRepository.getMountains();
    return mountains.map((mountain) => {
        return {
            mountain_id: mountain.mountain_id,
            name: mountain.name,
        };
    });
};
