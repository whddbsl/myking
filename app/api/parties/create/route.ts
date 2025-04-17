// mountain가져오는 get
// 생성하는 post
import { createParty } from "@/application/usecases/party/DfPartyCreateUsecase";
import { MountainListDto } from "@/application/usecases/partyLookup/dto/MountainListDto";
import { FindUUidByKakaoUsecase } from "@/application/usecases/partyLookup/FindUuidByKakaoUsecase";
import { getMountainList } from "@/application/usecases/partyLookup/MountainListUsecase";
import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { PartyRepository } from "@/domain/repositories/PartyRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { SbMountainRepository } from "@/infrastructure/repositories/SbMountainRepository";
import { SbPartyRepository } from "@/infrastructure/repositories/SbPartyRepository";
import { SbUserRepository } from "@/infrastructure/repositories/SbUserRepository";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

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

export async function GET(req: NextRequest) {
    const userRepository: UserRepository = new SbUserRepository();

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

    const kakaoId = userData.user.user_metadata.provider_id; //토큰으로 kakaoID를 가져옴

    if (!kakaoId) {
        return NextResponse.json(
            { message: "카카오 ID를 찾을 수 없습니다." },
            { status: 400 }
        );
    }

    const mountainRepository: MountainRepository = new SbMountainRepository();

    const mountainList: MountainListDto[] = await getMountainList(
        mountainRepository
    );

    const current_id = await FindUUidByKakaoUsecase(userRepository, kakaoId);

    return NextResponse.json({ mountainList, current_id });
}
