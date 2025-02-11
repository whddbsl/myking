import { PartyRepository } from "@/domain/repositories/PartyRepository";
import { PartyUpdateDto } from "./dto/PartyUpdateDto";

export const updateParty = async (
    partyRepository: PartyRepository,
    party: PartyUpdateDto
): Promise<void> => {
    await partyRepository.updateParty({
        current_members: party.current_members, // current_members만 포함하고 있음, 나머지도 적어주기
        party_id: party.party_id,
        creator_id: "",
        mountain_id: 0,
        description: "",
        max_members: 0,
        meeting_date: new Date(),
        end_date: new Date(),
        filter_state: "모집중",
        filter_gender: [],
        filter_age: [],
        created_at: new Date(),
    });
};
