import { createUser } from "@/application/usecases/user/DfUserUsecase";
import { UserDto } from "@/application/usecases/user/dto/UserDto";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/SbUserRepository";

export async function POST(request: Request) {
    try {
        const { kakaoId, name, nickname } = await request.json();
        const userRepository: UserRepository = new SbUserRepository();

        const userDto: UserDto = {
            kakao_id: kakaoId,
            name,
            nickname,
        };

        await createUser(userRepository, userDto);

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

        return new Response(
            JSON.stringify({
                message,
            }),
            { status, headers: { "Content-Type": "application/json" } }
        );
    }
}
