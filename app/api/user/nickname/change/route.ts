import { changeNickname } from "@/application/usecases/user/DfUpdateUserUsecase";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/SbUserRepository";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
    try {
        const supabase = createClientComponentClient();

        const { data: sessionData, error: sessionError } =
            await supabase.auth.getSession();

        if (!sessionData || !sessionData.session) {
            return NextResponse.json(
                { message: "로그인이 필요합니다." },
                { status: 401 }
            );
        }

        const kakaoId = sessionData.session.user.user_metadata.provider_id;

        if (!kakaoId) {
            return NextResponse.json(
                { message: "카카오 ID를 찾을 수 없습니다." },
                { status: 400 }
            );
        }

        const { newNickname } = await request.json();

        if (!newNickname) {
            return NextResponse.json(
                { message: "새로운 닉네임이 필요합니다." },
                { status: 400 }
            );
        }

        const userRepository: UserRepository = new SbUserRepository();
        await changeNickname(userRepository, kakaoId, newNickname);

        return NextResponse.json(
            { message: "닉네임이 성공적으로 변경되었습니다." },
            { status: 200 }
        );
    } catch (error: any) {
        if (error.code === "DUPLICATE_NICKNAME") {
            return NextResponse.json(
                { message: "이미 존재하는 닉네임입니다." },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: `오류 발생: ${error.message}` },
            { status: 500 }
        );
    }
}
