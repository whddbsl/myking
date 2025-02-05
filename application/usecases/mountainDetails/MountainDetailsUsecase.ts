import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { CourseRepository } from "@/domain/repositories/CourseRepository";
import { GetMountainDetailsDto } from "./dto/GetMountainDetailsDto";

//산 상세 + 코스 목록을 한번에 가져오는 Usecase
export const getMountainDetailsUsecase = async (
    mountainRepo: MountainRepository,
    courseRepo: CourseRepository,
    mountainId: number
): Promise<GetMountainDetailsDto> => {
    //산 상세 조회
    const mountain = await mountainRepo.getMountainDetailsById(mountainId);

    //관련 코스 목록 조회
    const courses = await courseRepo.findByMountainId(mountainId);
    return {
        mountain,
        courses,
    };
};
