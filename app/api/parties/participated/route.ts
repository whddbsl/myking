import { PartyMyParticipatedDto } from "@/application/usecases/partyLookup/dto/PartyParticipatedDto";
import { findMyParticipatedList } from "@/application/usecases/partyLookup/PartyParticipatedUsecase";
import { PartyRepository } from "@/domain/repositories/PartyRepository";
import { SbPartyRepository } from "@/infrastructure/repositories/SbPartyRepository";
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
        const myParticipatedList: PartyMyParticipatedDto[] =
            await findMyParticipatedList(repository, kakaoId);
        return NextResponse.json(myParticipatedList, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: "내가 참여한 파티 목록 조회 중 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}
