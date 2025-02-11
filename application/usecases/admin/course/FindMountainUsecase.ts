import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { MountainListDto } from "./dto/MountainListDto";

export const findAllMountains = async (
    mountainRepository: MountainRepository
): Promise<MountainListDto[]> => {
    const mountains = await mountainRepository.getMountains();
    return mountains.map((mountain) => ({
        mountain_id: mountain.mountain_id,
        name: mountain.name,
    }));
};
