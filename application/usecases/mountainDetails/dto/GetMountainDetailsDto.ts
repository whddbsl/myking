//산 정보와 코스 정보를 반환하는 데이터 구조 정의
import { Mountain } from "@/domain/entities/Mountain";
import { Course } from "@/domain/entities/Course";

//산 상세정보 + 코스 목록 등을 담는 DTO
export interface GetMountainDetailsDto {
    mountain: Mountain; //산 정보
    courses: Course[]; //해당 산의 코스 리스트
}
