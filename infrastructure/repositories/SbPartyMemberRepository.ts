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
            .eq("party_id", partyId); // party_id, user_id, created_at
        //userid만 반환하는 usecase 필요
        if (error) {
            throw new Error(
                `Failed to fetch members for party ${partyId}: ${error.message}`
            );
        }

        return data as PartyMember[];
    } // partymember 테이블에서 partyid가 같은 member를 가져옴

    async deletePartyMember(partyId: string, userId: string): Promise<void> {
        const supabase = await createClient();

        const { error } = await supabase
            .from("party_member") // 참가자 목록 테이블
            .delete()
            .eq("party_id", partyId)
            .eq("user_id", userId); // 해당 파티의 특정 사용자 삭제

        if (error) {
            throw new Error(error.message);
        }
    }
}
