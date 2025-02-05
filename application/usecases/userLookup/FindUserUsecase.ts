import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { UserFindDto } from "./dto/UserFindDto";

export const findUser = async (
    repository: UserRepository,
    userDto: UserFindDto
): Promise<User | null> => {
    const user: User | null = await repository.findById(userDto.kakao_id);

    if (!user) {
        return null;
    }
    return {
        user_id: user.user_id,
        name: user.name,
        nickname: user.nickname,
        profile_image: user.profile_image,
        created_at: user.created_at,
        kakao_id: user.kakao_id,
    };
};
