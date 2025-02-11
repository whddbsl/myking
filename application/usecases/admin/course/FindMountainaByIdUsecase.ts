import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { MountainListDto } from "./dto/MountainListDto";
import { Mountain } from "@/domain/entities/Mountain";

export const findMountainById = async (
    repository: MountainRepository,
    mountainId: string
): Promise<MountainListDto> => {
    const mountain: Mountain = await repository.getMountainById(mountainId);
    return {
        mountain_id: mountain.mountain_id,
        name: mountain.name,
    };
};
