import { UserRepository } from "@/domain/repositories/UserRepository";
import { UserCreateDto } from "./dto/UserCreateDto";

export const createUser = async (
    repository: UserRepository,
    user: UserCreateDto
): Promise<void> => {
    const existingNickname = await repository.findByNickname(user.nickname);

    if (existingNickname) {
        const error: any = new Error("nickname already exists");
        error.code = "DUPLICATE_NICKNAME";
        throw error;
    }

    try {
        await repository.create({
            user_id: "id",
            kakao_id: user.kakao_id,
            name: user.name,
            nickname: user.nickname,
            profile_image: user.profile_image,
            created_at: new Date(),
        });
    } catch (error: any) {
        throw new Error(`사용자 저장 실패: ${error.message}`);
    }
};
