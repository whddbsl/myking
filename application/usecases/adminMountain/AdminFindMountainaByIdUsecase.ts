import { AdminMountainRepository } from "@/domain/repositories/AdminMountainRepository";
import { AdminMountainDto } from "./dto/AdminMountainDto";

export const findMountainById = async (
    repository: AdminMountainRepository,
    mountainId: string
) => {
    const mountain: AdminMountainDto = await repository.getMountainById(
        mountainId
    );
    return mountain;
};
