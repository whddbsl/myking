import { CourseRepository } from "@/domain/repositories/CourseRepository";

export async function deleteCourse(
    courseRepository: CourseRepository,
    course_id: number
) {
    await courseRepository.deleteCourse(course_id);
}
