import { createUser } from "@/application/usecases/user/CreateUserUsecase";
import { UserCreateDto } from "@/application/usecases/user/dto/UserCreateDto";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/SbUserRepository";
import { SupabaseStorageService } from "@/infrastructure/services/SupabaseStorageService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const userRepository: UserRepository = new SbUserRepository();
        const file = formData.get("file") as File;
        const kakaoId = formData.get("kakao_id") as string;

        const storageService = new SupabaseStorageService();
        let profileImage: string;

        if (file && file.size > 0) {
            profileImage = await storageService.uploadProfileImage(
                file,
                kakaoId
            );
        } else {
            profileImage = `https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/images/user/member_default.svg`;
        }

        const userData: UserCreateDto = {
            kakao_id: formData.get("kakao_id")?.toString() || "",
            name: formData.get("name")?.toString() || "",
            nickname: formData.get("nickname")?.toString() || "",
            profile_image: profileImage,
        };

        await createUser(userRepository, userData);

        return new Response(
            JSON.stringify({
                message: "사용자 정보가 성공적으로 저장되었습니다.",
            }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error: any) {
        let status = 500;
        let message = "오류 발생";

        if (error.code === "DUPLICATE_NICKNAME") {
            status = 400;
            message = "이미 존재하는 닉네임입니다.";
        } else if (error.code === "USER_ALREADY_EXISTS") {
            status = 200;
            message = "사용자가 이미 존재합니다.";
        } else {
            message = `오류 발생: ${error.message}`;
        }

        return NextResponse.json(
            { message },
            { status, headers: { "Content-Type": "application/json" } }
        );
    }
}
