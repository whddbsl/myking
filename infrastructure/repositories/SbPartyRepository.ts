import { PartyRepository } from "@/domain/repositories/PartyRepository";
import { Party } from "../../domain/entities/Party";
import { createClient } from "@/utils/supabase/server";

//implements -> SbPartyRepository는 PartyRepository를 따른다
export class SbPartyRepository implements PartyRepository {
    async getParty(): Promise<Party[]> {
        const supabase = await createClient();
        const { data: party, error } = await supabase
            .from("party")
            .select()
            .order("created_at", { ascending: false });
        if (error) {
            throw new Error(error.message);
        }
        return party.map((party) => ({
            // party의 created_at이 string으로 받아지기 떄문에 Date로 바꿔줌
            ...party,
            created_at: new Date(party.created_at),
            meeting_date: new Date(party.meeting_date),
            end_date: new Date(party.end_date),
        }));
    } // 엔티티 형태로 반환

    async getPartyById(partyId: string): Promise<Party> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("party")
            .select()
            .eq("party_id", partyId) // ID로 필터링
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return {
            ...data,
            created_at: new Date(data.created_at),
            meeting_date: new Date(data.meeting_date),
            end_date: new Date(data.end_date),
        };
    }

    async createParty(party: Party): Promise<void> {
        const supabase = await createClient();
        const { data: partyData, error: partyError } = await supabase
            .from("party")
            .insert([
                {
                    creator_id: party.creator_id,
                    mountain_id: party.mountain_id,
                    description: party.description,
                    max_members: party.max_members,
                    //current_members: party.current_members,
                    meeting_date: party.meeting_date.toISOString(),
                    end_date: party.end_date.toISOString(),
                    //filter_state: party.filter_state,
                    filter_gender: party.filter_gender,
                    filter_age: party.filter_age,
                },
            ])
            .select("party_id")
            .single();
        if (partyError) {
            throw new Error(partyError.message);
        }

        const partyId = partyData.party_id;

        //partyMember에도 들어가야 하는 정보 party_id는 만들어준 파티의 id, user_id는 그 파티에 들어가는 팀장
        const partyMembers = {
            party_id: partyId,
            user_id: party.creator_id,
        };

        const { error: memberError } = await supabase
            .from("party_member")
            .insert(partyMembers);

        if (memberError) throw memberError;
    }

    async updateParty(party: Party): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase
            .from("party")
            .update([
                {
                    current_members: party.current_members,
                },
            ])
            .eq("party_id", party.party_id) // 앞: db 컬럼명, 뒤: 참가하는 party의 id
            .select();

        if (error) {
            throw new Error(error.message);
        }
    }
}
