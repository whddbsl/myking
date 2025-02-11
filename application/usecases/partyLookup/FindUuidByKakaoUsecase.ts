import { UserRepository } from "@/domain/repositories/UserRepository";
import { PartyCreatorIdDto } from "./dto/PartyCreatorIdDto";
import { User } from "@/domain/entities/User";
export const FindUUidByKakaoUsecase = async (
    repository: UserRepository,
    kakaoId: string
): Promise<PartyCreatorIdDto> => {
    const user: User = await repository.findById(kakaoId);

    return { user_id: user.user_id };
};
