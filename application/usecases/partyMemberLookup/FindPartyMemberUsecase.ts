import { PartyMemberRepository } from "@/domain/repositories/PartyMemberRepository";
import { PartyMemberListDto } from "./dto/PartyMemberListDto";

export const FindPartyMember = async (
    repository: PartyMemberRepository,

    partyId: string // partyId 전달
    // 데이터를 가져올 때의 dto는 usecase의 결과값
): Promise<PartyMemberListDto[]> => {
    // dto 형식을 말해줌
    const partyMembers = await repository.getMembersByPartyId(partyId); // entity

    // usecase의 결과값 -> entity를 dto로 만들기
    return partyMembers.map((partyMember) => ({
        user_id: partyMember.user_id,
    }));
    // user_id들이 배열에 담겨서 반환됨
};
