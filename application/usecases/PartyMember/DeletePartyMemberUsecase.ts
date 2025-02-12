import { PartyMemberRepository } from "@/domain/repositories/PartyMemberRepository";
//import { PartyMemberDeleteDto } from "./dto/PartyMemberDeleteDto";

export const deletePartyMember = async (
    repository: PartyMemberRepository,
    party_id: string,
    user_id: string
): Promise<void> => {
    await repository.deletePartyMember(party_id, user_id);
};
