import { AddPartyMember } from "../../../domain/entities/AddPartyMember";
import { SbPartyMemberRepository } from "@/infrastructure/repositories/SbPartyMemberRepository";

export const addPartyMember = async (
    repository: SbPartyMemberRepository, // 파티 멤버 레포지토리
    party: AddPartyMember
): Promise<void> => {
    await repository.addPartyMember(party);
};
