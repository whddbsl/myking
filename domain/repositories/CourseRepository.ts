import { Course } from "@/domain/entities/Course";

export interface CourseRepository {
    getCourses(): Promise<Course[]>;
    createCourse(course: Course): Promise<void>;
}
