import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { MountainListDto } from "./dto/MountainListDto";

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
    repository: MountainRepository
): Promise<MountainListDto[]> => {
    const mountainList: MountainListDto[] = (
        await repository.getMountains()
    ).map((mountain) => ({
        ...mountain,
        created_at: formatDate(mountain.created_at),
    }));

    return mountainList;
};
