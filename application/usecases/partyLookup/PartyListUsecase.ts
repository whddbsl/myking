import { UserRepository } from "./../../../domain/repositories/UserRepository";
import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { Party } from "../../../domain/entities/Party";
import { PartyListDto } from "./dto/PartyListDto";
import { PartyRepository } from "@/domain/repositories/PartyRepository";

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

/* function currentState(
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
} */

// 레포지토리에서 가져오기
export const findPartyList = async (
    partyRepository: PartyRepository, // domain에서 정의한 인터페이스 => 구현체 repository의 타입 (여기서의 repository는 변수)
    mountainRepository: MountainRepository,
    userRepository: UserRepository
): Promise<PartyListDto[]> => {
    const parties: Party[] = await partyRepository.getParty(); //repository에서 가져온 데이터를 담는 변수
    const partyList: PartyListDto[] = await Promise.all(
        parties.map(async (party: Party) => {
            const mountain = await mountainRepository.getMountainById(
                party.mountain_id.toString()
            );
            const user = await userRepository.getUserByUuid(party.creator_id);

            return {
                party_id: party.party_id.toString(),
                description: party.description,
                creator_id: Number(user.user_id),
                creator_nickname: user.nickname,
                creator_image: user.profile_image,
                mountain_id: party.mountain_id,
                mountain_name: mountain.name,
                max_members: party.max_members,
                filter_state: party.filter_state,
                filter_gender: party.filter_gender,
                filter_age: party.filter_age,
                meeting_date: formatDate(party.meeting_date),
                end_date: calcDday(party.end_date),
                timeLabel: calcTimeLabel(party.created_at),
            };
        })
    );
    return partyList;
};
