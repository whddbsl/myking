import { SbPartyRepository } from "@/infrastructure/repositories/SbPartyRepository";
import { PartyMyParticipatedDto } from "./dto/PartyParticipatedDto";

function formatDate(date: Date): string {
    console.log(typeof date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function calcDday(date: Date): string {
    const today: Date = new Date();
    const targetDate: Date = new Date(date);

    // 밀리초 단위 차이 계산
    const diffTime: number = targetDate.getTime() - today.getTime();

    // 밀리초를 일수로 변환
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        diffDays = 0;
    }

    return String(diffDays);
}

function calcTimeLabel(date: Date): string {
    const today: Date = new Date();
    const diffTime: number = today.getTime() - date.getTime();

    if (diffTime < 60000) {
        return "방금전";
    } else {
        return formatDate(date);
    }
}

function currentState(
    current_members: number,
    max_members: number,
    end_date: Date
): "모집중" | "마감" {
    const today = new Date();

    const diffTime: number = end_date.getTime() - today.getTime();

    if (current_members === max_members || diffTime < 0) {
        return "마감";
    } else {
        return "모집중";
    }
}

export const findMyParticipatedList = async (
    repository: SbPartyRepository,
    userId: string
): Promise<PartyMyParticipatedDto[]> => {
    const parties: PartyMyParticipatedDto[] =
        await repository.getMyParticipatedParty(userId);
    const partyList: PartyMyParticipatedDto[] = await Promise.all(
        parties.map((party) => ({
            party_id: party.party_id.toString(),
            creator_id: party.creator_id,
            created_at: party.created_at,
            mountain_id: party.mountain_id,
            current_members: party.current_members,
            max_members: party.max_members,
            filter_state: currentState(
                party.current_members,
                party.max_members,
                new Date(party.end_date)
            ),
            filter_gender: party.filter_gender,
            filter_age: party.filter_age,
            meeting_date: formatDate(new Date(party.meeting_date)),
            end_date: calcDday(new Date(party.end_date)),
            timeLabel: calcTimeLabel(new Date(party.created_at)),
            user: party.user,
            end_day: party.end_date,
        }))
    );

    return partyList;
};
