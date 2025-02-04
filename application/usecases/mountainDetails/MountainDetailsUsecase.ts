import { getCourseById } from '@/domain/repositories/CourseRepository';
import { getMountainDetailsById } from "@/domain/repositories/MountainRepository";

import { GetMountainDetailsDto } from "./dto/GetMountainDetailsDto";
import { GetMountainRequestDto } from "./dto/GetMountainRequestDto";


export const getMountainDetails = async (request: GetMountainRequestDto): Promise<GetMountainDetailsDto> => {
    const mountain = await getMountainDetailsById(request.mountain_id);
    const courses = await getCourseById(request.mountain_id);
    return { mountain, courses };
};

export const getMountainDetail = async (
    request: GetMountainRequestDto,
    mountainRepository: MountainRepository,
    courseRepository: CourseRepository
): Promise<GetMountainDetailsDto> => {
    const { name } = request;

    //1.산 정보 검색
    const mountain = await mountainRepository.getMountainDetailsById(name);
    if (!mountain) {
        throw new Error("검색 결과가 없습니다.");
    }

    //2.해당 산의 코스 리스트 검색
    const courses = await courseRepository.getCourseByMountainId(mountain.mountain_id);

    //3.결과 반환
    return {
        mountain,
        courses,
    };
};
