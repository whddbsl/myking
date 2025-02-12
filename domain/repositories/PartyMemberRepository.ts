import { PartyMember } from "../entities/PartyMember";

export interface PartyMemberRepository {
    createPartyMember(partyMember: PartyMember): Promise<void>;
    getMembersByPartyId(partyId: string): Promise<PartyMember[]>;
    deletePartyMember(partyId: string, userId: string): Promise<void>;
}
