import { AdminMountainRepository } from "@/domain/repositories/AdminMountainRepository";
import { AdminMountainDto } from "./dto/AdminMountainDto";
import { AdminMountain } from "@/domain/entities/AdminMountain";

function formatDate(date: Date): string {
    console.log(typeof date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const findAllMountains = async (
    repository: AdminMountainRepository
): Promise<AdminMountainDto[]> => {
    const mountains: AdminMountain[] = await repository.getMountains();

    const mountainList: AdminMountainDto[] = await Promise.all(
        mountains.map(async (mountain) => ({
            ...mountain,
            mountain_id: mountain.mountain_id.toString(),
            created_at: formatDate(mountain.created_at),
        }))
    );

    return mountainList;
};
