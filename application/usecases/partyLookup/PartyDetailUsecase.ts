import { Party } from "../../../domain/entities/Party";
import { PartyDetailDto } from "./dto/PartyDetailDto";
import { SbPartyRepository } from "@/infrastructure/repositories/SbPartyRepository";

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
    // user repository 받아오기 - user_id로 이름, 사진을 가져오는 함수 만들기 getNameByUserId()
    repository: SbPartyRepository, // domain에서 정의한 인터페이스 => 구현체 repository의 타입 (여기서의 repository는 변수)
    partyId: string
): Promise<PartyDetailDto> => {
    const party: Party = await repository.getPartyById(partyId); //repository에서 가져온 데이터를 담는 변수
    // promise all (위에 코드가 실행되고 나서 밑에게 실행되어야 함, 이거 안쓰면 creator_id가 undifined 아마도)
    //const creator_id = party.creator_id; //creator_id의 이미지와 이름 가져오기 위해 변수에 저장

    //const user: User = await UserRepository.getNameImageByUserId(party.creator_id); // user에 image와 name이 담김

    const partyDetail: PartyDetailDto = {
        party_id: party.party_id.toString(), //string 으로 변환
        // creator_name: user.name, //party.creator_id, // 아이디로 이름을 변환하는 함수 만들어서 party.creator_id를 매개변수로 넣음
        // creator_image: user.image,
        mountain_id: party.mountain_id,
        description: party.description,
        max_members: party.max_members,
        current_members: party.current_members,
        filter_state: party.filter_state,
        filter_gender: party.filter_gender,
        filter_age: party.filter_age,
        meeting_date: formatDate(party.meeting_date),
        end_date: calcDday(party.end_date),
        timeLabel: calcTimeLabel(party.created_at),
    };
    return partyDetail;
};
