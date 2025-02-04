import { Mountain } from "../entities/Mountain";

export interface MountainRepository {
    //산의 상세정보를 ID로 조회
    getMountainDetailsById(mountainId: string): Promise<Mountain>;

    //모든 산 목록 조회
    getAllMountains(): Promise<Mountain[]>;
}
