import { NextRequest, NextResponse } from "next/server";
import { findCourseDetail } from "@/application/usecases/admin/course/FindCourseDetailUsecase";
import { SbCourseRepository } from "@/infrastructure/repositories/SbCourseRepository";
import { SbMountainRepository } from "@/infrastructure/repositories/SbMountainRepository";
import { updateCourse } from "@/application/usecases/admin/course/UpdateCourseUsecase";
import { CourseUpdateDto } from "@/application/usecases/admin/course/dto/CourseUpdateDto";
import { CourseRepository } from "@/domain/repositories/CourseRepository";
import { MountainRepository } from "@/domain/repositories/MountainRepository";

//* 코스 id를 받아서 코스 상세 정보를 반환
export async function GET(
    request: NextRequest,
    { params }: { params: { courseId: number } }
) {
    const courseId = params.courseId;
    const courseRepository: CourseRepository = new SbCourseRepository();
    const mountainRepository: MountainRepository = new SbMountainRepository();
    const courseDetail = await findCourseDetail(
        courseId,
        courseRepository,
        mountainRepository
    );
    return NextResponse.json(courseDetail);
}

//* 코스 수정
export async function PUT(
    request: NextRequest,
    { params }: { params: { courseId: number } }
) {
    const courseId: number = params.courseId;
    const courseRepository: CourseRepository = new SbCourseRepository();
    const course: CourseUpdateDto = await request.json();
    await updateCourse(courseRepository, {
        course_id: courseId,
        name: course.name,
        description: course.description,
        difficulty: course.difficulty,
        distance: course.distance,
        latitude: course.latitude,
        longitude: course.longitude,
        duration: course.duration,
        image_url: course.image_url,
    });
    return NextResponse.json({ message: "Course updated successfully" });
}
