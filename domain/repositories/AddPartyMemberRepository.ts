import { AddPartyMember } from "../entities/AddPartyMember";

export interface AddPartyMemberRepository {
    addPartyMember(partyMember: AddPartyMember): Promise<void>;
    getMembersByPartyId(partyId: string): Promise<AddPartyMember[]>;
}
