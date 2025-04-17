import { PartyRepository } from "@/domain/repositories/PartyRepository";
import { PartyDetailDto } from "@/application/usecases/partyLookup/dto/PartyDetailDto";
import { SbPartyRepository } from "@/infrastructure/repositories/SbPartyRepository";
import { findPartyDetail } from "@/application/usecases/partyLookup/PartyDetailUsecase";
import { NextRequest, NextResponse } from "next/server";
import { SbPartyMemberRepository } from "@/infrastructure/repositories/SbPartyMemberRepository";
import { PartyMemberRepository } from "@/domain/repositories/PartyMemberRepository";
import { createPartyMember } from "@/application/usecases/partyMember/PartyMemberCreateUsecase";
import { updateParty } from "@/application/usecases/party/UpdatePartyUsecase";
import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { SbMountainRepository } from "@/infrastructure/repositories/SbMountainRepository";
import { SbUserRepository } from "@/infrastructure/repositories/SbUserRepository";
import { FindUUidByKakaoUsecase } from "@/application/usecases/partyLookup/FindUuidByKakaoUsecase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function GET(
    req: NextRequest, // 두 번째 인자로 params를 넣어주기 위해 필요
    { params }: { params: { partyId: string } } //dynamic routing
) {
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

    if (!kakaoId) {
        return NextResponse.json(
            { message: "카카오 ID를 찾을 수 없습니다." },
            { status: 400 }
        );
    }

    const { partyId } = params;
    const partyRepository: PartyRepository = new SbPartyRepository();
    const mountainRepository: MountainRepository = new SbMountainRepository();
    const userRepository: UserRepository = new SbUserRepository();
    const partyMemberRepository: PartyMemberRepository =
        new SbPartyMemberRepository();

    const partyDetail: PartyDetailDto = await findPartyDetail(
        partyRepository,
        mountainRepository,
        userRepository,
        partyMemberRepository,
        partyId
    );

    const current_id = await FindUUidByKakaoUsecase(userRepository, kakaoId);
    return NextResponse.json({ partyDetail, current_id });
}

export async function POST(
    request: Request,
    { params }: { params: { partyId: number } }
) {
    const { partyId } = params; // 엔드포인트에서 뽑아서?
    const { user_id } = await request.json(); //body를 구조분해할당
    const partyMemberRepository: PartyMemberRepository =
        new SbPartyMemberRepository();

    await createPartyMember(partyMemberRepository, {
        // 객체를 바로 넣지 않고 속성에 맞는 값을 담아줌
        party_id: partyId,
        user_id,
    });
    return NextResponse.json({ message: "Member created successfully" });
}

export async function PUT(
    request: Request,
    { params }: { params: { partyId: number } }
) {
    const { partyId } = params;
    const { current_members } = await request.json();
    const partyRepository: PartyRepository = new SbPartyRepository();

    await updateParty(partyRepository, {
        // 객체를 바로 넣지 않고 속성에 맞는 값을 담아줌
        party_id: partyId,
        current_members: current_members + 1,
    });
    return NextResponse.json({ message: "Member update successfully" });
}
