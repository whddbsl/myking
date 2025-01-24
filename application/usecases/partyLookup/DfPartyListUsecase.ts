import { Party } from "../../../domain/entities/Party";
import { PartyListDto } from "./dto/PartyListDto";
import { SbPartyRepository } from "@/infrastructure/repositoties/SbPartyRepository";

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
    const diffDays = String(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    return diffDays;
}

function calcTimeLabel(date: Date): string {
    const today: Date = new Date();
    const createdTime: Date = new Date(date);
    const diffTime: number = today.getTime() - createdTime.getTime();

    if (diffTime < 60000) {
        return "방금전";
    } else {
        return formatDate(date);
    }
}

// 레포지토리에서 가져오기
export const findPartyList = async (
    repository: SbPartyRepository // domain에서 정의한 인터페이스 => 구현체 repository의 타입 (여기서의 repository는 변수)
): Promise<PartyListDto[]> => {
    const parties: Party[] = await repository.getParty(); //repository에서 가져온 데이터를 담는 변수
    const partyList: PartyListDto[] = await Promise.all(
        parties.map((party) => ({
            party_id: party.party_id.toString(),
            creator_id: party.creator_id,
            mountain_id: party.mountain_id,
            max_members: party.max_members,
            filter_state: party.filter_state,
            filter_gender: party.filter_gender,
            filter_age: party.filter_age,
            meeting_date: formatDate(party.meeting_date),
            end_date: calcDday(party.end_date),
            timeLabel: calcTimeLabel(party.created_at),
        }))
    ); // 변환할 Dto를 담는 변수
    return partyList;
};
