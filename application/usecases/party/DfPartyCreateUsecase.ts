import { PartyRepository } from "@/domain/repositories/PartyRepository";
import { PartyCreateDto } from "./dto/PartyCreateDto";

export const createParty = async (
    repository: PartyRepository,
    party: PartyCreateDto
): Promise<void> => {
    await repository.createParty({
        ...party,
        meeting_date: new Date(party.meeting_date), // 엔티티에는 date로 되어 있기 때문에 타입 변환
        end_date: new Date(party.end_date),
        party_id: 0,
        current_members: 0,
        filter_state: "모집중",
        created_at: new Date(),
    });
};
