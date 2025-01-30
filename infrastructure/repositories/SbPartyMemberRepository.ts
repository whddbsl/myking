import { AddPartyMember } from "@/domain/entities/AddPartyMember";
import { createClient } from "@/utils/supabase/server";
import { AddPartyMemberRepository } from "@/domain/repositories/AddPartyMemberRepository";

export class SbPartyMemberRepository implements AddPartyMemberRepository {
    async addPartyMember(partyMember: AddPartyMember): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase
            .from("party_member")
            .insert([
                {
                    party_id: partyMember.party_id,
                    user_id: partyMember.user_id,
                },
            ])
            .select(); // select -> 바뀐 데이터가 반환됨 (currentmember +1)
        if (error) {
            throw new Error(`Failed to add party member: ${error.message}`);
        }
    }

    async getMembersByPartyId(partyId: string): Promise<AddPartyMember[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("party_members")
            .select()
            .eq("party_id", partyId);

        if (error) {
            throw new Error(
                `Failed to fetch members for party ${partyId}: ${error.message}`
            );
        }

        return data as AddPartyMember[];
    }
}
