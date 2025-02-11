import { Mountain } from "@/domain/entities/Mountain";
import { Course } from "@/domain/entities/Course";

// 예: 산 정보 자체에 코스 목록을 합쳐, 하나의 객체로 묶은 형태
export interface MountainWithCoursesDto extends Mountain {
    courses: Course[];
}
