import { PartyMember } from "../entities/PartyMember";

export interface PartyMemberRepository {
    createPartyMember(partyMember: PartyMember): Promise<void>;
    getMembersByPartyId(partyId: string): Promise<PartyMember[]>;
}
