import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { MountainListDto } from "./dto/MountainListDto";

// mountain id와 name을 가져오는 usecase
export const getMountainList = async (
    mountainRepository: MountainRepository
): Promise<MountainListDto[]> => {
    const mountains = await mountainRepository.getMountains();

    return mountains.map((mountain) => ({
        mountain_id: mountain.mountain_id,
        mountain_name: mountain.name,
    }));
};
