import { NextResponse } from "next/server";
import { executeMountainSearch } from "@/application/usecases/mountainSearch/MountainSearchUsecase";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url); // URL에서 query 파라미터 추출
    const query = searchParams.get("query");

    if (!query) {
        return NextResponse.json({ message: "Query parameter is required" }, { status: 400 });
    }

    try {
        // 검색 로직 실행
        const results = await executeMountainSearch({ query });
        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", error: (error as Error).message },
            { status: 500 }
        );
    }
}
