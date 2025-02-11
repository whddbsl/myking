import { PartyRepository } from "@/domain/repositories/PartyRepository";
import { PartyDetailDto } from "@/application/usecases/partyLookup/dto/PartyDetailDto";
import { SbPartyRepository } from "@/infrastructure/repositories/SbPartyRepository";
import { findPartyDetail } from "@/application/usecases/partyLookup/PartyDetailUsecase";
import { NextRequest, NextResponse } from "next/server";
import { SbPartyMemberRepository } from "@/infrastructure/repositories/SbPartyMemberRepository";
import { PartyMemberRepository } from "@/domain/repositories/PartyMemberRepository";
import { createPartyMember } from "@/application/usecases/PartyMember/DfPartyMemberCreateUsecase";

export async function GET(
    req: NextRequest,
    { params }: { params: { partyId: string } } // dynamic routing
) {
    const { partyId } = params;

    if (!partyId) {
        return NextResponse.json({ error: "partyId is required" }, { status: 400 });
    }

    try {
        const partyRepository: PartyRepository = new SbPartyRepository();

        // Usecase 호출
        const partyDetail: PartyDetailDto = await findPartyDetail(partyRepository, partyId);

        return NextResponse.json(partyDetail);
    } catch (error) {
        console.error("Error fetching party details:", error);
        return NextResponse.json({ error: "Failed to fetch party details" }, { status: 500 });
    }
}

export async function POST(req: NextRequest, { params }: { params: { partyId: string } }) {
    const { partyId } = params;

    if (!partyId) {
        return NextResponse.json({ error: "partyId is required" }, { status: 400 });
    }

    try {
        const body = await req.json();
        const { user_id } = body;

        if (!user_id) {
            return NextResponse.json({ error: "user_id is required" }, { status: 400 });
        }

        const partyMemberRepository: PartyMemberRepository = new SbPartyMemberRepository();

        // Usecase 호출
        await createPartyMember(partyMemberRepository, {
            party_id: parseInt(partyId, 10), // 문자열을 숫자로 변환
            user_id,
        });

        return NextResponse.json({ message: "Party member created successfully" });
    } catch (error) {
        console.error("Error creating party member:", error);
        return NextResponse.json({ error: "Failed to create party member" }, { status: 500 });
    }
}
