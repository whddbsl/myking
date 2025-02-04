import { UserRepository } from "@/domain/repositories/UserRepository";
import { UserUpdateDto } from "./dto/UserUpdateDto";

export const changeNickname = async (
    repository: UserRepository,
    user: UserUpdateDto
): Promise<void> => {
    const existingNickname = await repository.findByNickname(user.new_nickname);

    if (existingNickname) {
        const error: any = new Error("nickname already exists");
        error.code = "DUPLICATE_NICKNAME";
        throw error;
    }

    try {
        await repository.updateNickname(user.kakao_id, user.new_nickname);
    } catch (error: any) {
        throw new Error(`닉네임 변경 실패: ${error.message}`);
    }
};
