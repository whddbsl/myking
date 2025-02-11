"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    PageContainer,
    Header,
    Logo,
    SearchBanner,
    BannerTitle,
    SearchBarWrapper,
    SearchInput,
    MainSection,
    SectionTitle,
    SectionSubtitle,
    MountainCarousel,
    MountainCard,
    MountainImage,
    MountainInfo,
    MountainRegion,
    MountainName,
    MountainHashtags,
    CourseList,
    CourseItem,
    CourseDetailContainer,
    DifficultySpan,
    PopularBadge,
    DetailLink,
    MateSectionHeader,
    MateMoreLink,
    MateGrid,
    MateCard,
    Footer,
    ErrorMessage,
} from "./page.styles";
import { MountainWithCoursesDto } from "@/application/usecases/mountainDetails/dto/MountainWithCoursesDto";
// PartyListDto는 application/usecases/partyLookUp/dto 에 정의되어 있습니다.
import { PartyListDto } from "@/application/usecases/partyLookup/dto/PartyListDto";

export default function Home() {
    const router = useRouter();

    const [mountains, setMountains] = useState<MountainWithCoursesDto[]>([]);
    const [error, setError] = useState("");
    // 파티 데이터를 위한 상태 추가
    const [parties, setParties] = useState<PartyListDto[]>([]);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchMountains();
        fetchParties();
    }, []);

    const fetchMountains = async () => {
        try {
            const res = await fetch("/api/mountains");
            if (!res.ok) {
                throw new Error("산 정보를 가져오지 못했습니다.");
            }
            const data: MountainWithCoursesDto[] = await res.json();
            setMountains(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "알 수 없는 오류");
        }
    };

    // 파티 데이터 API를 호출하여 상태에 저장 (API 엔드포인트는 서버에서 Supabase를 통해 파티 데이터를 가져오도록 구현)
    const fetchParties = async () => {
        try {
            const res = await fetch("/api/parties");
            if (!res.ok) {
                throw new Error("파티 정보를 가져오지 못했습니다.");
            }
            const data: PartyListDto[] = await res.json();
            console.log("Fetched parties:", data); // 데이터를 콘솔에 출력
            setParties(data);
        } catch (err) {
            console.error(err);
        }
    };

    // 가로 스크롤 드래그 로직
    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        const offsetLeft = carouselRef.current?.offsetLeft || 0;
        setStartX(e.pageX - offsetLeft);
        setScrollLeft(carouselRef.current?.scrollLeft || 0);
    };
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        e.preventDefault();
        const offsetLeft = carouselRef.current?.offsetLeft || 0;
        const x = e.pageX - offsetLeft;
        const walk = x - startX;
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = scrollLeft - walk;
        }
    };
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);

    const handleSearchClick = () => {
        router.push("/search");
    };

    return (
        <PageContainer>
            <Header>
                <Logo src="/logos/logo.png" alt="마이킹 로고" />
            </Header>

            <SearchBanner>
                <BannerTitle>가고싶은 산을 검색해보세요</BannerTitle>
                <SearchBarWrapper onClick={handleSearchClick}>
                    <SearchInput
                        placeholder="이번 주는 어떤 산으로 가볼까요?"
                        readOnly
                    />
                </SearchBarWrapper>
            </SearchBanner>

            <MainSection>
                <SectionTitle>요즘 인기있는 산</SectionTitle>
                <SectionSubtitle>옆으로 넘겨보세요!</SectionSubtitle>
                {error && <ErrorMessage>{error}</ErrorMessage>}

                <MountainCarousel
                    ref={carouselRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        cursor: isDragging ? "grabbing" : "grab",
                    }}
                >
                    {mountains
                        .sort((a, b) => a.mountain_id - b.mountain_id)
                        .map((mt) => (
                            <MountainCard key={mt.mountain_id}>
                                <MountainImage
                                    style={{
                                        backgroundImage: `url(${
                                            mt.image_url ||
                                            "/images/sample_mountain.jpg"
                                        })`,
                                    }}
                                />
                                <MountainInfo>
                                    <MountainRegion>
                                        {mt.region || "지역 미정"}
                                    </MountainRegion>
                                    <MountainName>{mt.name}</MountainName>
                                    <MountainHashtags>
                                        {mt.altitude
                                            ? `#${mt.altitude}m`
                                            : "#정보없음"}
                                    </MountainHashtags>

                                    <CourseList>
                                        {mt.courses
                                            .sort(
                                                (a, b) =>
                                                    a.course_id - b.course_id
                                            )
                                            .slice(0, 3)
                                            .map((course) => (
                                                <CourseItem
                                                    key={course.course_id}
                                                >
                                                    <div className="course-name">
                                                        {course.name}
                                                    </div>
                                                    <CourseDetailContainer>
                                                        <DifficultySpan
                                                            difficulty={
                                                                course.difficulty ||
                                                                ""
                                                            }
                                                        >
                                                            {course.difficulty ||
                                                                "난이도?"}
                                                        </DifficultySpan>
                                                        <span className="divider">
                                                            •
                                                        </span>
                                                        <span className="time">
                                                            {course.duration ||
                                                                "소요시간?"}
                                                            시간
                                                        </span>
                                                        <span className="divider">
                                                            •
                                                        </span>
                                                        <span className="distance">
                                                            {course.distance ||
                                                                "거리?"}
                                                            km
                                                        </span>
                                                        {course.popularity && (
                                                            <PopularBadge>
                                                                인기
                                                            </PopularBadge>
                                                        )}
                                                    </CourseDetailContainer>
                                                </CourseItem>
                                            ))}
                                    </CourseList>

                                    <DetailLink
                                        href={`/mountains/${mt.mountain_id}`}
                                    >
                                        산/코스 자세히 보기
                                    </DetailLink>
                                </MountainInfo>
                            </MountainCard>
                        ))}
                </MountainCarousel>

                {/* 등산 메이트 모집 섹션: DB에서 가져온 파티 데이터를 표시 */}
                <MateSectionHeader>
                    <h5>등산 메이트 모집</h5>
                    <MateMoreLink>더보기 &gt;</MateMoreLink>
                </MateSectionHeader>

                <MateGrid>
                    {/* 최대 4개만 보여주기 */}
                    {parties.slice(0, 4).map((party) => {
                        // party.mountain_id로 산 목록에서 해당 산 찾아오기
                        const matchedMountain = mountains.find(
                            (mountain) =>
                                mountain.mountain_id === party.mountain_id
                        );

                        return (
                            <MateCard key={party.party_id}>
                                {/* 산 이름이 있으면 표시, 없으면 fallback */}
                                <span className="mountain">
                                    {matchedMountain
                                        ? matchedMountain.name
                                        : `산 번호: ${party.mountain_id}`}
                                </span>

                                {/* timeLabel 예: "1월 한달 간 정기적으로 등산하실 분 모집합니다." */}
                                <p>{party.description}</p>

                                {/* 가운데에 배치할 파티 설명 */}
                                <p className="description">
                                    {party.description}
                                </p>

                                {/* 상태, 인원 등 */}
                                <div className="club-info">
                                    상태: {party.filter_state} / 모집 인원:{" "}
                                    {party.max_members}명
                                </div>
                            </MateCard>
                        );
                    })}
                </MateGrid>
            </MainSection>

            <Footer>
                <div>주소: 서울특별시 중구 테헤란로 324 멋쟁이 사자처럼</div>
                <div>사업자등록번호: 264-88-01106</div>
                <div>대표자: Chill Guys</div>
                <div>문의 / 제안: likelion@myking.com</div>
                <div>연락처: 02-345-6789</div>
            </Footer>
        </PageContainer>
    );
}
