import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { MountainCreateDto } from "./dto/MountainCreateDto";


export const createNewMountain = async (
    mountainRepository: MountainRepository,
    mountain: MountainCreateDto
): Promise<void> => {
    await mountainRepository.createMountain({
        mountain_id: 0,
        ...mountain,
        created_at: new Date(),        
    });
};
