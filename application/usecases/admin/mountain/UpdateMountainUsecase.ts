import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { MountainUpdateDto } from "./dto/MountainUpdateDto";

export const updateMountain = async (
    mountainRepository: MountainRepository,
    mountain: MountainUpdateDto
): Promise<void> => {
    await mountainRepository.updateMountain({
        mountain_id: mountain.mountain_id,
        name: mountain.name,
        region: mountain.region,
        description: mountain.description,
        altitude: mountain.altitude,
        image_url: mountain.image_url,
        created_at: new Date(),
    });
};
