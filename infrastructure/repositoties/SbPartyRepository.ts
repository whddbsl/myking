import { PartyRepository } from "@/domain/repository/PartyRepository";
import { Party } from "../../domain/entities/Party";
import { createClient } from "@/utils/supabase/server";

//implements -> SbPartyRepository는 PartyRepository를 따른다
export class SbPartyRepository implements PartyRepository {
    async getParty(): Promise<Party[]> {
        const supabase = await createClient();
        const { data: party, error } = await supabase
            .from("party")
            .select(/* `*, mountain: mountains(name)` */); // party 테이블을 party라는 이름으로 불러올 data
        if (error) {
            throw new Error(error.message);
        }
        return party.map((party) => ({
            // party의 created_at이 string으로 받아지기 떄문에 Date로 바꿔줌
            ...party,
            created_at: new Date(party.created_at),
            meeting_date: new Date(party.meeting_date),
            // mountain: {
            //     ...party.mountain,
            //     name: party.mountain.name,
            // },
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
        };
    }
    // 생성, 삭제 등 수행 시에 함수 작성
}
