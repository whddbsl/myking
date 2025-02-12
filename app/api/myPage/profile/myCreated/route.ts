import { deleteParty } from "@/application/usecases/party/DeletePartyUsecase";
import { PartyMyCreatedDto } from "@/application/usecases/partyLookup/dto/PartyMyCreatedDto";
import { findMyCreatedPartyList } from "@/application/usecases/partyLookup/PartyMyCreatedUsecase";
import { PartyRepository } from "@/domain/repositories/PartyRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { SbPartyRepository } from "@/infrastructure/repositories/SbPartyRepository";
import { SbUserRepository } from "@/infrastructure/repositories/SbUserRepository";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

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
    const repository: PartyRepository = new SbPartyRepository();

    try {
        const myCreatedList: PartyMyCreatedDto[] = await findMyCreatedPartyList(
            repository,
            kakaoId
        );
        return NextResponse.json(myCreatedList, { status: 200 });
    } catch (error: any) {
        console.error("내가 생성한 파티 목록 조회 중 오류 발생: ", error);
        return NextResponse.json(
            { message: "내가 생성한 파티 목록 조회 중 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    const supabase = createClientComponentClient();
    const { partyId } = await request.json();

    // 헤더에서 토큰 가져오기
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
            { message: "로그인 정보가 없습니다." },
            { status: 401 }
        );
    }

    const accessToken = authHeader.split(" ")[1];

    const { data: userData, error: userError } = await supabase.auth.getUser(
        accessToken
    );

    if (userError || !userData.user) {
        return NextResponse.json(
            { message: "인증된 사용자가 아닙니다." },
            { status: 401 }
        );
    }

    const kakaoId = userData.user?.user_metadata.provider_id;
    const partyRepository: PartyRepository = new SbPartyRepository();
    const userRepository: UserRepository = new SbUserRepository();
    const party = await partyRepository.getPartyById(partyId);
    const user = await userRepository.findById(kakaoId);
    const userId = user?.user_id;

    if (party.creator_id !== userId) {
        return NextResponse.json(
            { message: "본인이 생성한 파티만 삭제할 수 있습니다." },
            { status: 403 }
        );
    }

    await deleteParty(partyRepository, partyId);
    return NextResponse.json(
        { message: "Party deleted successfully" },
        { status: 200 }
    );
}
