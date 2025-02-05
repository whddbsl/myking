import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { AdminMountainDto } from "./dto/AdminMountainDto";

export const findMountainById = async (
    repository: MountainRepository,
    mountainId: string
): Promise<AdminMountainDto> => {
    const mountain: AdminMountainDto = await repository.getMountainById(
        mountainId
    );
    return mountain;
};
