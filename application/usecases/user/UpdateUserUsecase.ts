import { UserRepository } from "@/domain/repositories/UserRepository";
import { UserUpdateDto } from "./dto/UserUpdateDto";

export const changeProfile = async (
    repository: UserRepository,
    user: UserUpdateDto
): Promise<void> => {
    if (user.new_nickname && user.new_nickname !== user.current_nickname) {
        const existingNickname = await repository.findByNickname(
            user.new_nickname
        );

        if (existingNickname) {
            const error: any = new Error("nickname already exists");
            error.code = "DUPLICATE_NICKNAME";
            throw error;
        }
    }

    // 닉네임과 프로필 이미지를 모두 변경하는 경우
    if (
        user.new_nickname &&
        user.new_nickname !== user.current_nickname &&
        user.profile_image
    ) {
        try {
            await repository.updateNicknameAndProfileImage(
                user.kakao_id,
                user.new_nickname,
                user.profile_image
            );
        } catch (error: any) {
            throw new Error(`닉네임과 프로필 사진 변경 실패: ${error.message}`);
        }
    }

    // 닉네임만 변경하는 경우
    else if (user.new_nickname && user.new_nickname !== user.current_nickname) {
        try {
            await repository.updateNickname(user.kakao_id, user.new_nickname);
        } catch (error: any) {
            throw new Error(`닉네임 변경 실패: ${error.message}`);
        }
    }

    // 프로필 이미지만 변경하는 경우
    else if (user.profile_image) {
        try {
            await repository.updateProfileImage(
                user.kakao_id,
                user.profile_image
            );
        } catch (error: any) {
            throw new Error(`프로필 사진 변경 실패: ${error.message}`);
        }
    }
};
