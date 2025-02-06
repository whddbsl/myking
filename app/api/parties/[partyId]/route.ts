import { PartyRepository } from "@/domain/repositories/PartyRepository";
import { PartyDetailDto } from "@/application/usecases/partyLookup/dto/PartyDetailDto";
import { SbPartyRepository } from "@/infrastructure/repositories/SbPartyRepository";
import { findPartyDetail } from "@/application/usecases/partyLookup/PartyDetailUsecase";
import { NextRequest, NextResponse } from "next/server";
import { SbPartyMemberRepository } from "@/infrastructure/repositories/SbPartyMemberRepository";
import { PartyMemberRepository } from "@/domain/repositories/PartyMemberRepository";
import { createPartyMember } from "@/application/usecases/partyMember/PartyMemberCreateUsecase";

export async function GET(
    req: NextRequest,
    { params }: { params: { partyId: string } } //dynamic routing
) {
    const { partyId } = params;
    console.log("id", partyId);
    const partyRepository: PartyRepository = new SbPartyRepository();

    const partyDetail: PartyDetailDto = await findPartyDetail(
        partyRepository,
        // userRepository,
        partyId
    );
    return NextResponse.json(partyDetail);
}

export async function POST(
    request: Request,
    { params }: { params: { partyId: number } }
) {
    const { partyId } = params; // 엔드포인트에서 뽑아서?
    const { /* party_id, */ user_id } = await request.json(); //body를 구조분해할당
    const partyMemberRepository: PartyMemberRepository =
        new SbPartyMemberRepository();

    await createPartyMember(partyMemberRepository, {
        // 객체를 바로 넣지 않고 속성에 맞는 값을 담아줌
        party_id: partyId,
        user_id,
    });
    return NextResponse.json({ message: "Mountain created successfully" });
}

// export async function POST(
//     req: NextRequest,
//     { params }: { params: { partyId: number } } //dynamic routing
// ) {
//     const { partyId } = params;

// }
