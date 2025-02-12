import { UserRepository } from "@/domain/repositories/UserRepository";
import { PartyCreatorIdDto } from "./dto/PartyCreatorIdDto";
import { User } from "@/domain/entities/User";
export const FindUUidByKakaoUsecase = async (
    repository: UserRepository,
    kakaoId: string
): Promise<PartyCreatorIdDto> => {
    const user: User | null = await repository.findById(kakaoId);

    if (!user) throw new Error("user not found");

    return { user_id: user.user_id };
};
