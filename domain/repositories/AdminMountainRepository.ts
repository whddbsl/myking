import { AdminMountainList } from "../entities/AdminMountainList";
import { AdminMountainCreate } from "../entities/AdminMountainCreate";
import { AdminMountainDto } from "@/application/usecases/adminMountain/dto/AdminMountainDto";
import { AdminMountainUpdate } from "../entities/AdminMountainUpdate";

export interface AdminMountainRepository {
    getMountains(): Promise<AdminMountainList[]>;
    deleteMountain(mountainId: string): Promise<void>;
    createMountain(mountain: AdminMountainCreate): Promise<void>;
    getMountainById(mountainId: string): Promise<AdminMountainDto>;
    updateMountain(mountain: AdminMountainUpdate): Promise<void>;
}
