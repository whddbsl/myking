// app/api/mountains/route.ts
import { NextResponse } from "next/server";
import { SbMountainRepository } from "@/infrastructure/repositories/SbMountainRepository";
import { SbCourseRepository } from "@/infrastructure/repositories/SbCourseRepository";

export async function GET() {
    try {
        const mountainRepo = new SbMountainRepository();
        const courseRepo = new SbCourseRepository();

        // 모든 산 목록
        const mountains = await mountainRepo.getMountains();

        // 산마다 코스 정보를 합쳐서 최종 배열 생성
        const result = [];
        for (const mt of mountains) {
            const courses = await courseRepo.findByMountainId(mt.mountain_id);
            result.push({
                ...mt,
                courses,
            });
        }

        return NextResponse.json(result, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
