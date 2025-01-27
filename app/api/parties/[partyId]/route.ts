import { PartyRepository } from "@/domain/repositories/PartyRepository";
import { PartyDetailDto } from "@/application/usecases/partyLookup/dto/PartyDetailDto";
import { SbPartyRepository } from "@/infrastructure/repositories/SbPartyRepository";
import { findPartyDetail } from "@/application/usecases/partyLookup/DfPartyDetailUsecase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { partyId: string } } //dynamic routing
) {
    const { partyId } = params;
    console.log("id", partyId);
    const partyRepository: PartyRepository = new SbPartyRepository();

    const partyDetail: PartyDetailDto = await findPartyDetail(
        partyRepository,
        partyId
    );
    return NextResponse.json(partyDetail);
}
