import { findAllCourses } from "@/application/usecases/admin/course/AdminFindCourseUsecase";
import { AdminCourseListDto } from "@/application/usecases/admin/course/dto/AdminCourseListDto";
import { CourseRepository } from "@/domain/repositories/CourseRepository";
import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { SbCourseRepository } from "@/infrastructure/repositories/SbCourseRepository";
import { SbMountainRepository } from "@/infrastructure/repositories/SbMountainRepository";
import { NextResponse } from "next/server";

export async function GET() {
    const courseRepository: CourseRepository = new SbCourseRepository();
    const mountainRepository: MountainRepository = new SbMountainRepository();
    const courses: AdminCourseListDto[] = await findAllCourses(
        courseRepository,
        mountainRepository
    );
    return NextResponse.json(courses);
}

