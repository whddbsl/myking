
import { deleteCourse } from "@/application/usecases/admin/course/DeleteCourseUsecase";
import { CourseListDto } from "@/application/usecases/admin/course/dto/CourseListDto";
import { findAllCourses } from "@/application/usecases/admin/course/FindCourseUsecase";
import { CourseRepository } from "@/domain/repositories/CourseRepository";
import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { SbCourseRepository } from "@/infrastructure/repositories/SbCourseRepository";
import { SbMountainRepository } from "@/infrastructure/repositories/SbMountainRepository";
import { NextResponse } from "next/server";

export async function GET() {
    const courseRepository: CourseRepository = new SbCourseRepository();
    const mountainRepository: MountainRepository = new SbMountainRepository();
    const courses: CourseListDto[] = await findAllCourses(
        courseRepository,
        mountainRepository
    );
    return NextResponse.json(courses);
}

export async function DELETE(request: Request) {
    const { courseId } = await request.json();
    const courseRepository: CourseRepository = new SbCourseRepository();
    await deleteCourse(courseRepository, courseId);
    return NextResponse.json({ message: "Course deleted successfully" });
}
