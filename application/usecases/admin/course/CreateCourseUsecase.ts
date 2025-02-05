import { CourseRepository } from "@/domain/repositories/CourseRepository";
import { CourseCreateDto } from "./dto/CourseCreateDto";


export const createNewCourse = async (
    courseRepository: CourseRepository,
    course: CourseCreateDto
): Promise<void> => {
    await courseRepository.createCourse({
        ...course,
        course_id: 0,
        created_at: new Date(),
    });
};
