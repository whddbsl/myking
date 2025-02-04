import { Mountain } from "../entities/Mountain";

export interface MountainRepository {
    getMountains(): Promise<Mountain[]>;
    deleteMountain(mountainId: string): Promise<void>;
    createMountain(mountain: Mountain): Promise<void>;
    getMountainById(mountainId: string): Promise<Mountain>;
    updateMountain(mountain: Mountain): Promise<void>;
}
