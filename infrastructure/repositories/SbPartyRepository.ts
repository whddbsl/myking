import { PartyRepository } from "@/domain/repositories/PartyRepository";
import { Party } from "../../domain/entities/Party";
import { createClient } from "@/utils/supabase/server";
import {
    PartyMyParticipatedDto,
    UserDto,
} from "@/application/usecases/partyLookup/dto/PartyParticipatedDto";

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
        return party
            .map((party) => ({
                // party의 created_at이 string으로 받아지기 떄문에 Date로 바꿔줌
                ...party,
                created_at: new Date(party.created_at),
                meeting_date: new Date(party.meeting_date),
                end_date: new Date(party.end_date),
            }))
            .sort((a, b) => {
                // 모집중이면 우선순위 높게
                if (a.filter_state === "모집중" && b.filter_state === "마감")
                    return -1;
                if (a.filter_state === "마감" && b.filter_state === "모집중")
                    return 1;
                return 0; // 같다면 변경 없음
            });
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
                    filter_state: "모집중",
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

    async getPartyByCreatorId(kakaoId: string): Promise<Party[]> {
        const supabase = await createClient();
        const { data: user, error: userError } = await supabase
            .from("user")
            .select("user_id")
            .eq("kakao_id", kakaoId)
            .single();

        if (userError) {
            throw new Error(userError.message);
        }

        const { data, error } = await supabase
            .from("party")
            .select("*")
            .eq("creator_id", user?.user_id);

        if (error) {
            throw new Error(error.message);
        }

        return data.map((data) => ({
            ...data,
            created_at: new Date(data.created_at),
            meeting_date: new Date(data.meeting_date),
            end_date: new Date(data.end_date),
        }));
    }

    async getMyParticipatedParty(
        kakaoId: string
    ): Promise<PartyMyParticipatedDto[]> {
        const supabase = await createClient();
        const { data: userData, error: userError } = await supabase
            .from("user")
            .select("user_id")
            .eq("kakao_id", kakaoId)
            .single();

        if (!userData || userError) {
            throw new Error(userError.message);
        }

        const userId = userData.user_id;

        const { data: partyList, error: partyError } = await supabase
            .from("party_member")
            .select("*")
            .eq("user_id", userId);

        if (!partyList || partyError) {
            throw new Error(partyError.message);
        }

        const partyIds = partyList.map((member) => member.party_id);

        const { data: participatedData, error: participatedError } =
            await supabase
                .from("party")
                .select("*")
                .in("party_id", partyIds)
                .neq("creator_id", userId);

        if (!participatedData || participatedError) {
            throw new Error(participatedError.message);
        }

        const creatorId = participatedData.map((data) => data.creator_id);

        const { data: creatorData, error: creatorError } = await supabase
            .from("user")
            .select("*")
            .in("user_id", creatorId);

        if (!creatorData || creatorError) {
            throw new Error(creatorError.message);
        }

        const creatorMap = creatorData.reduce((acc, creator) => {
            acc[creator.user_id] = creator;
            return acc;
        }, {} as Record<string, UserDto>);

        return participatedData.map((partyList) => ({
            ...partyList,
            created_at: new Date(partyList.created_at),
            meeting_date: new Date(partyList.meeting_date),
            end_date: new Date(partyList.end_date),
            user: creatorMap[partyList.creator_id],
        }));
    }

    async deleteParty(partyId: string): Promise<void> {
        const supabase = await createClient();

        try {
            // party_member 테이블에서 party_id가 일치하는 모든 행 삭제
            console.log("Deleting from party_member");
            const { error: deletePartyMemberError } = await supabase
                .from("party_member")
                .delete()
                .eq("party_id", partyId);

            if (deletePartyMemberError) {
                console.error(
                    "Delete party_member error: ",
                    deletePartyMemberError
                );
                throw new Error(deletePartyMemberError.message);
            }

            // party 테이블에서 party_id가 일치하는 행 삭제
            console.log("Deleting from party");
            const { error: deletePartyError } = await supabase
                .from("party")
                .delete()
                .eq("party_id", partyId);

            if (deletePartyError) {
                console.error("Delete party error: ", deletePartyError);
                throw new Error(deletePartyError.message);
            }

            console.log("Party and related members deleted successfully");
        } catch (error) {
            console.error("Error deleting party and related members: ", error);
            throw error;
        }
    }
}
