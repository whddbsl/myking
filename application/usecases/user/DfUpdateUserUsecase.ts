import { UserRepository } from "@/domain/repositories/UserRepository";

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
