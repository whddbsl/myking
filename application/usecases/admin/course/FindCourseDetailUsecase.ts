import { CourseRepository } from "@/domain/repositories/CourseRepository";
import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { CourseDetailDto } from "./dto/CourseDetailDto";

export const findCourseDetail = async (
    courseId: number,
    repository: CourseRepository,
    mountainRepository: MountainRepository
): Promise<CourseDetailDto> => {
    const course = await repository.getCourseById(courseId);
    const mountain = await mountainRepository.getMountainById(
        course.mountain_id.toString()
    );

    return {
        course_id: course.course_id,
        name: course.name,
        description: course.description,
        difficulty: course.difficulty,
        distance: course.distance,
        latitude: course.latitude,
        longitude: course.longitude,
        duration: course.duration,
        image_url: course.image_url,
        mountain_name: mountain.name,
        mountain_id: mountain.mountain_id,
    };
};
