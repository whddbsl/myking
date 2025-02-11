import { PartyMember } from "@/domain/entities/PartyMember";
import { createClient } from "@/utils/supabase/server";
import { PartyMemberRepository } from "@/domain/repositories/PartyMemberRepository";

export class SbPartyMemberRepository implements PartyMemberRepository {
    async createPartyMember(partyMember: PartyMember): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase
            .from("party_member")
            .insert([
                {
                    party_id: partyMember.party_id,
                    user_id: partyMember.user_id,
                    // created_at은 필요 없음(supabase에서 생성)
                },
            ])
            .select(); // select -> 바뀐 데이터가 반환됨 (currentmember +1)
        if (error) {
            throw new Error(`Failed to add party member: ${error.message}`);
        }
    }

    async getMembersByPartyId(partyId: string): Promise<PartyMember[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("party_member")
            .select()
            .eq("party_id", partyId);

        if (error) {
            throw new Error(
                `Failed to fetch members for party ${partyId}: ${error.message}`
            );
        }

        return data as PartyMember[];
    }
}
