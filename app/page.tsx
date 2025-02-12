"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loadingSpinner/loadingSpinner";
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
    SearchIconWrapper,
} from "./page.styles";
import { MountainWithCoursesDto } from "@/application/usecases/mountainDetails/dto/MountainWithCoursesDto";
import { PartyListDto } from "@/application/usecases/partyLookup/dto/PartyListDto";

export default function Home() {
    const router = useRouter();

    const [mountains, setMountains] = useState<MountainWithCoursesDto[]>([]);
    const [error, setError] = useState("");
    const [parties, setParties] = useState<PartyListDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const carouselRef = useRef<HTMLDivElement>(null);

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

    const fetchParties = async () => {
        try {
            const res = await fetch("/api/parties");
            if (!res.ok) {
                throw new Error("파티 정보를 가져오지 못했습니다.");
            }
            const data = await res.json();
            console.log("Fetched parties:", data);
            // API 응답 객체에서 partyList 프로퍼티만 추출하여 사용
            setParties(data.partyList);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        Promise.all([fetchMountains(), fetchParties()]).then(() => {
            setLoading(false);
        });
    }, []);

    const handleSearchClick = () => {
        router.push("/search");
    };

    const handleMoreClick = () => {
        router.push("/parties");
    };

    const handlePartyClick = (partyId: number) => {
        router.push(`/parties/${partyId}`);
    };

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (carouselRef.current) {
            setIsDragging(true);
            setStartX(e.pageX);
            setScrollLeft(carouselRef.current.scrollLeft);
        }
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (isDragging && carouselRef.current) {
            const x = e.pageX - startX;
            carouselRef.current.scrollLeft = scrollLeft - x;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => setIsDragging(false);

    if (loading) {
        // 로딩 상태일 때 LoadingSpinner 컴포넌트를 반환합니다.
        return <LoadingSpinner />;
    }

    if (error) {
        return <PageContainer>오류 발생: {error}</PageContainer>;
    }

    return (
        <PageContainer>
            <Header>
                <Logo src="/logos/logo.png" alt="마이킹 로고" />
            </Header>

            <SearchBanner>
                <BannerTitle>가고싶은 산을 검색해보세요</BannerTitle>
                <SearchBarWrapper onClick={handleSearchClick}>
                    <SearchInput placeholder="이번 주는 어떤 산으로 가볼까요?" readOnly />
                    <SearchIconWrapper onClick={handleSearchClick} />
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
                                        backgroundImage: `url(${mt.image_url || "/images/sample_mountain.jpg"})`,
                                    }}
                                />
                                <MountainInfo>
                                    <MountainRegion>{mt.region || "지역 미정"}</MountainRegion>
                                    <MountainName>{mt.name}</MountainName>
                                    <MountainHashtags>
                                        {mt.altitude ? `#${mt.altitude}m` : "#정보없음"}
                                    </MountainHashtags>

                                    <CourseList>
                                        {mt.courses
                                            .sort((a, b) => a.course_id - b.course_id)
                                            .slice(0, 3)
                                            .map((course) => (
                                                <CourseItem key={course.course_id}>
                                                    <div className="course-name">{course.name}</div>
                                                    <CourseDetailContainer>
                                                        <DifficultySpan difficulty={course.difficulty || ""}>
                                                            {course.difficulty || "난이도?"}
                                                        </DifficultySpan>
                                                        <span className="divider">•</span>
                                                        <span className="time">
                                                            {course.duration || "소요시간?"}시간
                                                        </span>
                                                        <span className="divider">•</span>
                                                        <span className="distance">{course.distance || "거리?"}km</span>
                                                        {course.popularity && <PopularBadge>인기</PopularBadge>}
                                                    </CourseDetailContainer>
                                                </CourseItem>
                                            ))}
                                    </CourseList>

                                    <DetailLink href={`/mountains/${mt.mountain_id}`}>산/코스 자세히 보기</DetailLink>
                                </MountainInfo>
                            </MountainCard>
                        ))}
                </MountainCarousel>

                <MateSectionHeader>
                    <h5>등산 메이트 모집</h5>
                    <MateMoreLink onClick={handleMoreClick}>더보기 &gt;</MateMoreLink>
                </MateSectionHeader>

                <MateGrid>
                    {parties.slice(0, 4).map((party) => {
                        const matchedMountain = mountains.find(
                            (mountain) => mountain.mountain_id === party.mountain_id
                        );

                        return (
                            <MateCard key={party.party_id} onClick={() => handlePartyClick(party.party_id)}>
                                <span className="mountain">
                                    {matchedMountain ? matchedMountain.name : `산 번호: ${party.mountain_id}`}
                                </span>
                                <p className="description">{party.description}</p>
                                <div className="club-info">
                                    상태: {party.filter_state} / 모집 인원: {party.max_members}
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
