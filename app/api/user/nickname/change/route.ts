import { UserUpdateDto } from "@/application/usecases/user/dto/UserUpdateDto";
import { changeNickname } from "@/application/usecases/user/UpdateUserUsecase";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/SbUserRepository";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        const authHeader = req.headers.get("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { message: "로그인 정보가 없습니다." },
                { status: 401 }
            );
        }

        const accessToken = authHeader.split(" ")[1];

        const supabase = createServerComponentClient({
            cookies,
        });

        const { data: userData, error: userError } =
            await supabase.auth.getUser(accessToken);

        const kakaoId = userData.user?.user_metadata.provider_id;

        if (!kakaoId) {
            return NextResponse.json(
                { message: "카카오 ID를 찾을 수 없습니다." },
                { status: 400 }
            );
        }

        const { newNickname } = await req.json();

        if (!newNickname) {
            return NextResponse.json(
                { message: "새로운 닉네임이 필요합니다." },
                { status: 400 }
            );
        }

        const userRepository: UserRepository = new SbUserRepository();
        const userDto: UserUpdateDto = {
            kakao_id: kakaoId,
            new_nickname: newNickname,
        };
        await changeNickname(userRepository, userDto);

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
