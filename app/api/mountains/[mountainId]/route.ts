import { NextResponse } from "next/server";
import { SbMountainRepository } from "@/infrastructure/repositories/SbMountainRepository";
import { SbCourseRepository } from "@/infrastructure/repositories/SbCourseRepository";

export async function GET(req: Request, { params }: { params: { mountainId: string } }) {
    try {
        const mountainId = parseInt(params.mountainId, 10);
        if (isNaN(mountainId)) {
            return NextResponse.json({ error: "잘못된 산 ID입니다." }, { status: 400 });
        }

        const mountainRepo = new SbMountainRepository();
        const courseRepo = new SbCourseRepository();

        const mountain = await mountainRepo.getMountainDetailsById(mountainId);
        if (!mountain) {
            return NextResponse.json({ error: "산 정보를 찾을 수 없습니다." }, { status: 404 });
        }

        const courses = await courseRepo.findByMountainId(mountainId);

        return NextResponse.json(
            {
                ...mountain,
                courses,
            },
            { status: 200 }
        );
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
