// mountain가져오는 get
// 생성하는 post

import { createParty } from "@/application/usecases/party/DfPartyCreateUsecase";
import { PartyRepository } from "@/domain/repositories/PartyRepository";
import { SbPartyRepository } from "@/infrastructure/repositories/SbPartyRepository";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {
        creator_id,
        mountain_id,
        description,
        max_members,
        meeting_date,
        end_date,
        filter_gender,
        filter_age,
    } = await request.json();
    const partyRepository: PartyRepository = new SbPartyRepository();
    await createParty(partyRepository, {
        creator_id,
        mountain_id,
        description,
        max_members,
        meeting_date,
        end_date,
        filter_gender,
        filter_age,
    });
    return NextResponse.json({ message: "Party created successfully" });
}
