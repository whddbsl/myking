import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { PartyMemberRepository } from "@/domain/repositories/PartyMemberRepository";
import { PartyRepository } from "@/domain/repositories/PartyRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { PartyListDto } from "./dto/PartyListDto";

function formatDate(date: Date): string {
    console.log(typeof date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const findAllParties = async (
    partyRepository: PartyRepository,
    mountainRepository: MountainRepository,
    userRepository: UserRepository,
    partyMemberRepository: PartyMemberRepository
): Promise<PartyListDto[]> => {
    const parties = await partyRepository.getParty();
    const partyList: PartyListDto[] = await Promise.all(
        parties.map(async (party) => {
            const mountain = await mountainRepository.getMountainById(
                party.mountain_id.toString()
            );
            const creator = await userRepository.getUserByUuid(
                party.creator_id
            );
            const participants =
                await partyMemberRepository.getMembersByPartyId(
                    party.party_id.toString()
              );
          const participantsName = await Promise.all(
            participants.map(async (participant) => {
                const user = await userRepository.getUserByUuid(
                    participant.user_id
                );
                return user;
            })
          );
            return {
                party_id: party.party_id,
                mountain_id: party.mountain_id,
                mountain_name: mountain.name,
                description: party.description,
                current_members: party.current_members,
                max_members: party.max_members,
                meeting_date: formatDate(party.meeting_date),
                end_date: formatDate(party.end_date),
                filter_gender: party.filter_gender,
                filter_state: party.filter_state,
                filter_age: party.filter_age,
                creator_id: creator.nickname,
                participants: participantsName.map((participant) => ({
                    nickname: participant.nickname,
                })),
                created_at: formatDate(party.created_at),
            };
        })
    );
    return partyList;
};
