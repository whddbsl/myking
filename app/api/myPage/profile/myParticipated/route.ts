import { deletePartyMember } from "@/application/usecases/PartyMember/DeletePartyMemberUsecase";
import { updateParty } from "@/application/usecases/party/UpdatePartyUsecase";
import { PartyMyParticipatedDto } from "@/application/usecases/partyLookup/dto/PartyParticipatedDto";
import { findMyParticipatedList } from "@/application/usecases/partyLookup/PartyParticipatedUsecase";
import { PartyRepository } from "@/domain/repositories/PartyRepository";
import { SbPartyRepository } from "@/infrastructure/repositories/SbPartyRepository";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { SbPartyMemberRepository } from "@/infrastructure/repositories/SbPartyMemberRepository";
import { PartyMemberRepository } from "@/domain/repositories/PartyMemberRepository";
import { FindUUidByKakaoUsecase } from "@/application/usecases/partyLookup/FindUuidByKakaoUsecase";
import { SbUserRepository } from "@/infrastructure/repositories/SbUserRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { SbMountainRepository } from "@/infrastructure/repositories/SbMountainRepository";
import { MountainListDto } from "@/application/usecases/admin/course/dto/MountainListDto";
import { findMountainById } from "@/application/usecases/admin/course/FindMountainaByIdUsecase";

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
            { message: "로그인 정보가 없습니다." },
            { status: 401 }
        );
    }

    const accessToken = authHeader.split(" ")[1];
    const supabase = createClientComponentClient();

    const { data: userData, error: userError } = await supabase.auth.getUser(
        accessToken
    );

    if (userError || !userData.user) {
        return NextResponse.json(
            { message: "인증된 사용자가 아닙니다." },
            { status: 401 }
        );
    }

    const kakaoId = userData.user.user_metadata.provider_id;
    const partyRepository: PartyRepository = new SbPartyRepository();
    const userRepository: UserRepository = new SbUserRepository();
    const mountainRepository: MountainRepository = new SbMountainRepository();

    const currentId = await FindUUidByKakaoUsecase(userRepository, kakaoId);

    try {
        const myParticipatedList: PartyMyParticipatedDto[] =
            await findMyParticipatedList(partyRepository, kakaoId);

        const mountainDetails: MountainListDto[] = await Promise.all(
            myParticipatedList.map(async (party) => {
                return findMountainById(
                    mountainRepository,
                    party.mountain_id.toString()
                );
            })
        );
        return NextResponse.json({
            myParticipatedList,
            currentId,
            mountainDetails,
        });
    } catch (error: any) {
        return NextResponse.json(
            { message: "내가 참여한 파티 목록 조회 중 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    const { current_members, party_id } = await request.json();
    const partyRepository: PartyRepository = new SbPartyRepository();

    await updateParty(partyRepository, {
        // 객체를 바로 넣지 않고 속성에 맞는 값을 담아줌
        party_id: party_id,
        current_members: current_members - 1,
    });
    return NextResponse.json({ message: "Member update successfully" });
}

export async function DELETE(request: Request) {
    const { party_id, user_id } = await request.json();
    const partyMemberRepository: PartyMemberRepository =
        new SbPartyMemberRepository();

    await deletePartyMember(partyMemberRepository, party_id, user_id);
    return NextResponse.json({ message: "Member delete successfully" });
}
