import { createNewCourse } from "@/application/usecases/admin/course/CreateCourseUsecase";
import { findAllMountains } from "@/application/usecases/admin/mountain/AdminFindMountainUsecase";
import { CourseRepository } from "@/domain/repositories/CourseRepository";
import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { SbCourseRepository } from "@/infrastructure/repositories/SbCourseRepository";
import { SbMountainRepository } from "@/infrastructure/repositories/SbMountainRepository";
import { SupabaseStorageService } from "@/infrastructure/services/SupabaseStorageService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const formData = await request.formData();
    const courseRepository: CourseRepository = new SbCourseRepository();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json(
            { error: "파일이 제공되지 않았습니다." },
            { status: 400 }
        );
    }

    const storageService = new SupabaseStorageService();
    const imageUrl = await storageService.uploadImage(file, "courses");

    const courseData = {
        name: formData.get("name")?.toString() || "",
        mountain_id: Number(formData.get("mountain_id")?.toString() || 0),
        description: formData.get("description")?.toString() || "",
        difficulty:
            (formData.get("difficulty")?.toString() as
                | "초급"
                | "중급"
                | "상급") || "초급",
        distance: Number(formData.get("distance")?.toString() || 0),
        latitude: Number(formData.get("latitude")?.toString() || 0),
        longitude: Number(formData.get("longitude")?.toString() || 0),
        duration: Number(formData.get("duration")?.toString() || 0),
        image_url: imageUrl,
    };

    try {
        await createNewCourse(courseRepository, courseData);
        return NextResponse.json({ message: "Course created successfully" });
    } catch (error) {
        console.error("코스 생성 실패:", error);
        return NextResponse.json(
            { error: "Failed to create course" },
            { status: 500 }
        );
    }
}


export async function GET() {
    const mountainRepository: MountainRepository = new SbMountainRepository();
    const mountains = await findAllMountains(mountainRepository);
    return NextResponse.json(mountains);
}

