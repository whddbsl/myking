import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { MountainUpdateDto } from "./dto/MountainUpdateDto";


export const updateMountain = async (
    mountainRepository: MountainRepository,
    mountain: MountainUpdateDto
): Promise<void> => {
    await mountainRepository.updateMountain({
        ...mountain,
        mountain_id: 0,
        created_at: new Date(),
        image_url: "",
        altitude: 0,
    });
};
