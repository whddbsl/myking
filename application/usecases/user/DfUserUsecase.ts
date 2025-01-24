import { UserRepository } from "@/domain/repositories/UserRepository";
import { UserDto } from "./dto/UserDto";

export const createUser = async (
    repository: UserRepository,
    user: UserDto
): Promise<void> => {
    const existingNickname = await repository.findByNickname(user.nickname);
    const existingUser = await repository.findById(user.kakao_id);

    if (existingNickname) {
        // throw new Error("nickname already exists");
        const error: any = new Error("nickname already exists");
        error.code = "DUPLICATE_NICKNAME";
        throw error;
    } else if (existingUser) {
        // throw new Error("user already exists");
        const error: any = new Error("user already exists");
        error.code = "USER_ALREADY_EXISTS";
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
