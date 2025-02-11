import { deleteParty } from "@/application/usecases/party/DeletePartyUsecase";
import { findPartyList } from "@/application/usecases/partyLookup/PartyListUsecase";
import { PartyListDto } from "@/application/usecases/partyLookup/dto/PartyListDto";
import { PartyRepository } from "@/domain/repositories/PartyRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { SbPartyRepository } from "@/infrastructure/repositories/SbPartyRepository";
import { SbUserRepository } from "@/infrastructure/repositories/SbUserRepository";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

// 레포지토리, usecase 가져오는 어댑터
export async function GET() {
    const partyRepository: PartyRepository = new SbPartyRepository();
    // mountain repository에서 받아오기 (id, name)

    const partyList: PartyListDto[] = await findPartyList(partyRepository); // usecase의 반환값 dto를 담음 -> 타입은 dto
    // findPartyList에 partyRepository 주입 - 의존성 주입 : repository가 바뀌어도 다른 코드를 건드리지 않기 위해서 -> 어댑터만 수정하면 됨
    return NextResponse.json(partyList); //dto 반환 실행
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
    const userId = user.user_id;

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
