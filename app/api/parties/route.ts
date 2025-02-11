import { deleteParty } from "@/application/usecases/party/DeletePartyUsecase";
import { findPartyList } from "@/application/usecases/partyLookup/PartyListUsecase";
import { PartyListDto } from "@/application/usecases/partyLookup/dto/PartyListDto";
import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { SbMountainRepository } from "@/infrastructure/repositories/SbMountainRepository";
import { PartyRepository } from "@/domain/repositories/PartyRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { SbPartyRepository } from "@/infrastructure/repositories/SbPartyRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { MountainListDto } from "@/application/usecases/partyLookup/dto/MountainListDto";
import { getMountainList } from "@/application/usecases/partyLookup/MountainListUsecase";
import { SbUserRepository } from "@/infrastructure/repositories/SbUserRepository";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

// 레포지토리, usecase 가져오는 어댑터
export async function GET(req: Request) {
    const url = new URL(req.url);
    const mountain_id = Number(url.searchParams.get("mountain_id")) || 0;
    const filter_state = url.searchParams.get("filter_state") || "";

    // const filter_age = url.searchParams.get("filter_age")?.split(",") || [];
    const filter_gender =
        url.searchParams.get("filter_gender")?.split(",").filter(Boolean) || [];
    const filter_age =
        url.searchParams.get("filter_age")?.split(",").filter(Boolean) || [];

    const partyRepository: PartyRepository = new SbPartyRepository();
    const mountainRepository: MountainRepository = new SbMountainRepository();
    const userRepository: UserRepository = new SbUserRepository();

    let partyList: PartyListDto[] = await findPartyList(
        partyRepository,
        mountainRepository,
        userRepository
    ); // usecase의 반환값 dto를 담음 -> 타입은 dto

    const mountainList: MountainListDto[] = await getMountainList(
        mountainRepository
    );

    partyList = partyList.filter((party) => {
        // 산 필터: 기본값(0)인 경우는 검사하지 않고, 그 외엔 party의 산 ID가 일치해야 합니다.
        const mountainMatch =
            mountain_id === 0 ? true : party.mountain_id === mountain_id;

        // 모집 상태 필터: 기본값("모집중")인 경우는 검사하지 않고, 그 외엔 party의 모집 상태가 일치해야 합니다.
        const stateMatch =
            filter_state === "" ? true : party.filter_state === filter_state;

        // 성별 필터: 기본값("성별무관")인 경우는 검사하지 않고, 그 외엔 party의 성별이 일치해야 합니다.
        const genderMatch =
            filter_gender.length === 0
                ? true
                : filter_gender.some((gender) =>
                      party.filter_gender.includes(gender)
                  );

        // 나이 필터: 배열이 비어있으면 검사하지 않고, 그 외엔 party의 나이 목록 중 하나라도 선택된 값과 일치해야 합니다.
        const ageMatch =
            filter_age.length === 0
                ? true
                : filter_age.some((age) => party.filter_age.includes(age));

        // 모든 활성화된 필터 조건을 모두 만족해야 합니다.
        return mountainMatch && stateMatch && genderMatch && ageMatch;
    });
    // findPartyList에 partyRepository 주입 - 의존성 주입 : repository가 바뀌어도 다른 코드를 건드리지 않기 위해서 -> 어댑터만 수정하면 됨
    return NextResponse.json({ partyList, mountainList }); //dto 반환 실행
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
