import { PartyRepository } from "@/domain/repositories/PartyRepository";
import { Party } from "../../../domain/entities/Party";
import { PartyDetailDto } from "./dto/PartyDetailDto";
import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { PartyMemberRepository } from "@/domain/repositories/PartyMemberRepository";

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
    const createdTime: Date = new Date(date);
    const diffTime: number = today.getTime() - createdTime.getTime();

    if (diffTime < 60000) {
        return "방금전";
    } else {
        return formatDate(date);
    }
}

// 레포지토리에서 가져오기
export const findPartyDetail = async (
    partyRepository: PartyRepository, // domain에서 정의한 인터페이스 => 구현체 repository의 타입 (여기서의 repository는 변수)
    mountainRepository: MountainRepository,
    userRepository: UserRepository,
    partyMemberRepository: PartyMemberRepository,
    partyId: string
): Promise<PartyDetailDto> => {
    const party: Party = await partyRepository.getPartyById(partyId);
    const [mountain, user, member] = await Promise.all([
        mountainRepository.getMountainById(party.mountain_id.toString()),
        userRepository.getUserByUuid(party.creator_id),
        partyMemberRepository.getMembersByPartyId(party.party_id.toString()),
    ]);

    const partyDetail: PartyDetailDto = {
        party_id: party.party_id, //string 으로 변환
        user_id: member.map((m) => m.user_id),
        creator_id: user.user_id,
        creator_nickname: user.nickname,
        creator_image: user.profile_image,
        mountain_id: party.mountain_id,
        mountain_name: mountain.name,
        description: party.description,
        max_members: party.max_members,
        current_members: party.current_members,
        filter_state: party.filter_state, // "마감" 일 때 비활성화용
        filter_gender: party.filter_gender,
        filter_age: party.filter_age,
        meeting_date: formatDate(party.meeting_date),
        end_date: calcDday(party.end_date),
        timeLabel: calcTimeLabel(party.created_at),
    };
    return partyDetail;
};
