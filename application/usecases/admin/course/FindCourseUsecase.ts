import { CourseRepository } from "@/domain/repositories/CourseRepository";

import { Course } from "@/domain/entities/Course";

import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { CourseListDto } from "./dto/CourseListDto";
import { findMountainById } from "./FindMountainaByIdUsecase";
import { MountainListDto } from "./dto/MountainListDto";

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
    courseRepository: CourseRepository,
    mountainRepository: MountainRepository
): Promise<CourseListDto[]> => {
    const courses: Course[] = await courseRepository.getCourses();
    const courseList: CourseListDto[] = await Promise.all(
        courses.map(async (course) => {
            const mountainList: MountainListDto = await findMountainById(
                mountainRepository,
                course.mountain_id.toString()
            );
            return {
                ...course,
                mountain_name: mountainList.name,
                mountain_id: mountainList.mountain_id,
                created_at: formatDate(course.created_at),
            };
        })
    );
    return courseList;
};
