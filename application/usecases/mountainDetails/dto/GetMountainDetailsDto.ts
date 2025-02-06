//산 정보와 코스 정보를 반환하는 데이터 구조 정의
import { Mountain } from "@/domain/entities/Mountain";
import { Course } from "@/domain/entities/Course";

export interface GetMountainDetailsDto {
    mountain: Mountain; //산 정보
    courses: Course[]; //해당 산의 코스 리스트
}
