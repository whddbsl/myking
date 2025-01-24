import { AdminMountain } from "../entities/AdminMountain";
import { AdminMountainCreate } from "../entities/AdminMountainCreate";

export interface AdminMountainRepository {
    getMountains(): Promise<AdminMountain[]>;
    deleteMountain(mountainId: string): Promise<void>;
    createMountain(mountain: AdminMountainCreate): Promise<void>;
}
