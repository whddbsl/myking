import { UserFindDto } from "@/application/usecases/userLookup/dto/UserFindDto";
import { findUser } from "@/application/usecases/userLookup/FindUserUsecase";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/SbUserRepository";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
            { message: "로그인 정보가 없습니다." },
            { status: 401 }
        );
    }

    const accessToken = authHeader.split(" ")[1];

    const supabase = createClientComponentClient();

    const { data: userData, error: userError } = await supabase.auth.getUser(
        accessToken
    );

    if (userError || !userData.user) {
        return NextResponse.json(
            { message: "인증된 사용자가 아닙니다." },
            { status: 401 }
        );
    }

    const kakaoId = userData.user.user_metadata.provider_id;

    if (!kakaoId) {
        return NextResponse.json(
            { message: "카카오 ID를 찾을 수 없습니다." },
            { status: 400 }
        );
    }
    const userRepository: UserRepository = new SbUserRepository();
    const userDto: UserFindDto = { kakao_id: kakaoId };
    const user: UserFindDto | null = await findUser(userRepository, userDto);

    if (!user) {
        return NextResponse.json(
            { message: "사용자를 찾을 수 없습니다." },
            { status: 404 }
        );
    }

    return NextResponse.json(user);
}
