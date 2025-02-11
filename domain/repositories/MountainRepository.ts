import { SearchMountainDto } from "@/application/usecases/mountainSearch/dto/SearchMountainDto";
import { Mountain } from "../entities/Mountain";

export interface MountainRepository {
    //산의 상세정보를 ID로 조회
    getMountainDetailsById(mountainId: number): Promise<Mountain>;

    //산 이름 검색
    searchByName(query: string): Promise<SearchMountainDto[]>;
<<<<<<< HEAD

=======
>>>>>>> 1ab4be9e7f3bd11e50418683ff7c6f9ac5784259
    getMountains(): Promise<Mountain[]>;
    deleteMountain(mountainId: string): Promise<void>;
    createMountain(mountain: Mountain): Promise<void>;
    getMountainById(mountainId: string): Promise<Mountain>;
    updateMountain(mountain: Mountain): Promise<void>;
}

//interface는 typescript에서 클래스나 객체가 반드시 구현해야 하는 함수의 형태를 정의하는 역할을 함.
