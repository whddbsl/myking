import { PartyRepository } from "@/domain/repositories/PartyRepository";

export const deleteParty = async (
    repository: PartyRepository,
    partyId: string
): Promise<void> => {
    await repository.deleteParty(partyId);
};
