import { PartyMemberCreateDto } from "./dto/PartyMemberCreateDto";
import { PartyMemberRepository } from "@/domain/repositories/PartyMemberRepository";

export const createPartyMember = async (
    repository: PartyMemberRepository, // 파티 멤버 레포지토리
    party: PartyMemberCreateDto
): Promise<void> => {
    await repository.createPartyMember({ ...party, created_at: new Date() }); //party_id, user_id 밖에 없음
    // entity 형태로 보내야 하기 때문에 created_at을 추가해야함
};
