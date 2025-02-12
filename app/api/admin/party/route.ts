import { findAllParties } from "@/application/usecases/admin/party/FindPartyUsecase";
import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { PartyMemberRepository } from "@/domain/repositories/PartyMemberRepository";
import { PartyRepository } from "@/domain/repositories/PartyRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { SbMountainRepository } from "@/infrastructure/repositories/SbMountainRepository";
import { SbPartyMemberRepository } from "@/infrastructure/repositories/SbPartyMemberRepository";
import { SbPartyRepository } from "@/infrastructure/repositories/SbPartyRepository";
import { SbUserRepository } from "@/infrastructure/repositories/SbUserRepository";
import { NextResponse } from "next/server";

export async function GET() {
    const partyRepository: PartyRepository = new SbPartyRepository();
    const mountainRepository: MountainRepository = new SbMountainRepository();
    const partyMemberRepository: PartyMemberRepository =
        new SbPartyMemberRepository();
    const userRepository: UserRepository = new SbUserRepository();

    const parties = await findAllParties(
        partyRepository,
        mountainRepository,
        userRepository,
        partyMemberRepository
    );
    return NextResponse.json(parties);
}
