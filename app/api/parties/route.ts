//import { findPartyDetail } from "@/application/usecases/partyDetail/DfPartyDetailUsecase";
import { findPartyList } from "@/application/usecases/partyLookup/DfPartyListUsecase";
import { PartyListDto } from "@/application/usecases/partyLookup/dto/PartyListDto";
//import { PartyDetailDto } from "@/application/usecases/partyDetail/dto/PartyDetailDto";
import { PartyRepository } from "@/domain/repository/PartyRepository";
import { SbPartyRepository } from "@/infrastructure/repositoties/SbPartyRepository";
import { NextResponse } from "next/server";

// 레포지토리, usecase 가져오는 어댑터
export async function GET() {
    const partyRepository: PartyRepository = new SbPartyRepository();

    const partyList: PartyListDto[] = await findPartyList(partyRepository); // usecase의 반환값 dto를 담음 -> 타입은 dto
    // findPartyList에 partyRepository 주입 - 의존성 주입 : repository가 바뀌어도 다른 코드를 건드리지 않기 위해서 -> 어댑터만 수정하면 됨
    return NextResponse.json(partyList); //dto 반환 실행
}
