import { UserUpdateDto } from "@/application/usecases/user/dto/UserUpdateDto";
import { changeProfile } from "@/application/usecases/user/UpdateUserUsecase";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/SbUserRepository";
import { SupabaseStorageService } from "@/infrastructure/services/SupabaseStorageService";
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

        const formData = await req.formData();
        const file = formData.get("file") as File;
        const newNickname = formData.get("new_nickname") as string;
        const currentNickname = formData.get("current_nickname") as string;
        let profileImage: string = "";

        const storageService = new SupabaseStorageService();

        if (file && file.size > 0) {
            profileImage = await storageService.uploadProfileImage(
                file,
                kakaoId
            );
        }

        const userRepository: UserRepository = new SbUserRepository();
        const userDto: UserUpdateDto = {
            kakao_id: kakaoId,
            current_nickname: currentNickname,
            new_nickname: newNickname,
            profile_image: profileImage,
        };

        await changeProfile(userRepository, userDto);

        return NextResponse.json(
            { message: "프로필이 성공적으로 변경되었습니다." },
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
