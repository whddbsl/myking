import { UserRepository } from "@/domain/repositories/UserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/SbUserRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { kakaoId } = await request.json();
        console.log("kakao id: ", kakaoId);

        if (!kakaoId) {
            return new Response("Kakao ID is required", { status: 400 });
        }

        const userRepository: UserRepository = new SbUserRepository();
        const existingUser = await userRepository.findById(kakaoId);

        console.log("Existing User: ", existingUser);

        if (existingUser) {
            return NextResponse.json(
                {
                    exists: true,
                    nickname: existingUser.nickname,
                    profileImage: existingUser.profile_image,
                },
                { status: 200 }
            );
        }

        return NextResponse.json({ exists: false }, { status: 200 });
    } catch (error: any) {
        console.error("Error in POST /api/auth/checkUser: ", error);
        return new Response(`오류 발생: ${error.message}`, { status: 500 });
    }
}
