import { CourseRepository } from "@/domain/repositories/CourseRepository";

import { Course } from "@/domain/entities/Course";

import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { AdminCourseListDto } from "./dto/AdminCourseListDto";
import { findMountainById } from "../mountain/AdminFindMountainaByIdUsecase";

function formatDate(date: Date): string {
    console.log(typeof date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const findAllCourses = async (
    repository: CourseRepository,
    mountainRepository: MountainRepository
): Promise<AdminCourseListDto[]> => {
    const courses: Course[] = await repository.getCourses();
    const courseList: AdminCourseListDto[] = await Promise.all(
        courses.map(async (course) => {
            const mountain_name = await findMountainById(
                mountainRepository,
                course.mountain_id.toString()
            );
            return {
                ...course,
                mountain_name: mountain_name.name,
                created_at: formatDate(course.created_at),
            };
        })
    );
    return courseList;
};
