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

        return new Response("사용자 정보가 성공적으로 저장되었습니다.", {
            status: 200,
        });
    } catch (error: any) {
        return new Response(`오류 발생: ${error.message}`, { status: 500 });
    }
}
