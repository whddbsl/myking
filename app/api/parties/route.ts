import { findPartyList } from "@/application/usecases/partyLookup/PartyListUsecase";
import { PartyListDto } from "@/application/usecases/partyLookup/dto/PartyListDto";
import { PartyRepository } from "@/domain/repositories/PartyRepository";
import { SbPartyRepository } from "@/infrastructure/repositories/SbPartyRepository";
import { NextResponse } from "next/server";

// 레포지토리, usecase 가져오는 어댑터
export async function GET() {
    const partyRepository: PartyRepository = new SbPartyRepository();
    // mountain repository에서 받아오기 (id, name)

    const partyList: PartyListDto[] = await findPartyList(partyRepository); // usecase의 반환값 dto를 담음 -> 타입은 dto
    // findPartyList에 partyRepository 주입 - 의존성 주입 : repository가 바뀌어도 다른 코드를 건드리지 않기 위해서 -> 어댑터만 수정하면 됨
    return NextResponse.json(partyList); //dto 반환 실행
}
