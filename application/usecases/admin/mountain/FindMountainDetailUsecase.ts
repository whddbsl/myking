import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { MountainDetailDto } from "./dto/MountainDetailDto";
import { SbMountainRepository } from "@/infrastructure/repositories/SbMountainRepository";

export const findMountainDetail = async (mountainId: string) => {
    const mountainRepository: MountainRepository = new SbMountainRepository();
    const mountain: MountainDetailDto =
        await mountainRepository.getMountainById(mountainId);
    return {
        name: mountain.name,
        image_url: mountain.image_url,
        region: mountain.region,
        description: mountain.description,
        altitude: mountain.altitude,
    };
};