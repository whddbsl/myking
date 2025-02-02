import { UserRepository } from "@/domain/repositories/UserRepository";
import { UserDto } from "./dto/UserDto";

export const createUser = async (
    repository: UserRepository,
    user: UserDto
): Promise<void> => {
    const existingNickname = await repository.findByNickname(user.nickname);

    if (existingNickname) {
        const error: any = new Error("nickname already exists");
        error.code = "DUPLICATE_NICKNAME";
        throw error;
    }

    try {
        await repository.create({
            kakao_id: user.kakao_id,
            name: user.name,
            nickname: user.nickname,
        });
    } catch (error: any) {
        throw new Error(`사용자 저장 실패: ${error.message}`);
    }
};

export const changeNickname = async (
    repository: UserRepository,
    kakaoId: string,
    newNickname: string
): Promise<void> => {
    const existingNickname = await repository.findByNickname(newNickname);

    if (existingNickname) {
        const error: any = new Error("nickname already exists");
        error.code = "DUPLICATE_NICKNAME";
        throw error;
    }

    try {
        await repository.updateNickname(kakaoId, newNickname);
    } catch (error: any) {
        throw new Error(`닉네임 변경 실패: ${error.message}`);
    }
};
