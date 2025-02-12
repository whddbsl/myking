import { CourseRepository } from "@/domain/repositories/CourseRepository";
import { CourseUpdateDto } from "./dto/CourseUpdateDto";

export const updateCourse = async (
    courseRepository: CourseRepository,
    course: CourseUpdateDto
) => {
    await courseRepository.updateCourse({
        course_id: course.course_id,
        mountain_id: 0,
        name: course.name,
        description: course.description,
        difficulty: course.difficulty,
        distance: course.distance,
        latitude: course.latitude,
        longitude: course.longitude,
        popularity: false,
        duration: course.duration,
        image_url: course.image_url,
        created_at: new Date(),
    });
};
