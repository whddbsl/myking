"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { MountainWithCoursesDto } from "@/application/usecases/mountainDetails/dto/MountainWithCoursesDto";

export default function Home() {
    const router = useRouter();

    const [mountains, setMountains] = useState<MountainWithCoursesDto[]>([]);
    const [error, setError] = useState("");

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchMountains();
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

    // 검색창 클릭 시 검색 페이지로 이동
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
                    <SearchInput placeholder="이번 주는 어떤 산으로 가볼까요?" readOnly />
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
                                            .sort((a, b) => a.course_id - b.course_id) // 먼저 정렬
                                            .slice(0, 3) // 이후 상위 3개 코스 선택
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
                    <h2>등산 메이트 모집</h2>
                    <MateMoreLink>더보기 &gt;</MateMoreLink>
                </MateSectionHeader>
                <MateGrid>
                    <MateCard>
                        <span className="mountain">소백산</span>
                        <p>1월 한달 동안 정기적으로 등산하실 분 모집합니다.</p>
                        <div className="club-info">우리동네 등산왕</div>
                    </MateCard>
                    <MateCard>
                        <span className="mountain">소백산</span>
                        <p>1월 한달 동안 정기적으로 등산하실 분 모집합니다.</p>
                        <div className="club-info">우리동네 등산왕</div>
                    </MateCard>
                    <MateCard>
                        <span className="mountain">소백산</span>
                        <p>1월 한달 동안 정기적으로 등산하실 분 모집합니다.</p>
                        <div className="club-info">우리동네 등산왕</div>
                    </MateCard>
                    <MateCard>
                        <span className="mountain">소백산</span>
                        <p>1월 한달 동안 정기적으로 등산하실 분 모집합니다.</p>
                        <div className="club-info">우리동네 등산왕</div>
                    </MateCard>
                </MateGrid>
            </MainSection>

            <Footer>
                <div>주소: 서울특별시 중구 테헤란로 324 몇쟁이 사자처럼</div>
                <div>사업자등록번호: 264-88-01106</div>
                <div>대표자: Chill Guys</div>
                <div>문의 / 제안: likelion@myking.com</div>
                <div>연락처: 02-345-6789</div>
            </Footer>
        </PageContainer>
    );
}

/* -------- styled-components -------- */
const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #269386;
`;

const ErrorMessage = styled.div`
    color: red;
    margin-bottom: 1rem;
    font-weight: bold;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: white;
`;

const Logo = styled.img`
    width: 120px;
    height: auto;
`;

const SearchBanner = styled.section`
    background-color: #269386;
    padding: 2rem 1rem;
    text-align: center;
    border-radius: 20px 20px 0 0;
`;

const BannerTitle = styled.h2`
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #fff;
`;

const SearchBarWrapper = styled.div`
    display: inline-flex;
    max-width: 600px;
    width: 100%;
    border-radius: 32px;
    background-color: #fff;
    padding: 0.75rem 1rem;
    align-items: center;
    cursor: pointer;
    border: 2.5px solid #ddd;
    transition: border-color 0.3s ease;

    &:hover {
        border-color: #207d73;
    }
`;

const SearchInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    cursor: pointer;
`;

const MainSection = styled.main`
    flex: 1;
    padding: 1.5rem;
    width: 100%;
    margin: 0 auto;
    border-radius: 20px 20px 0 0;
    background-color: white;
`;

const SectionTitle = styled.h3`
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
    font-weight: bold;
`;

const SectionSubtitle = styled.p`
    color: #666;
    margin-bottom: 1rem;
`;

const MountainCarousel = styled.div`
    display: flex;
    gap: 1rem;
    overflow-x: hidden;
    padding-bottom: 1rem;
    user-select: none;
`;

const MountainCard = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    min-width: 420px;
    @media (max-width: 768px) {
        flex-direction: column;
        min-width: 420px;
        max-width: 500px;
    }
`;

/**
 * 내부 요소가 위->아래로 배치되고,
 * DetailLink는 margin-top: auto로 항상 하단에 고정됩니다.
 */
const MountainInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
`;

const MountainImage = styled.div`
    flex: 0 0 40%;
    background-size: cover;
    background-position: center;
    min-height: 200px;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const MountainRegion = styled.div`
    font-size: 0.875rem;
    color: #888;
`;

const MountainName = styled.h4`
    font-size: 1.2rem;
    margin: 0.25rem 0;
`;

const MountainHashtags = styled.div`
    color: #269386;
    font-size: 0.9rem;
    margin-bottom: 1rem;
`;

const CourseList = styled.div``;

const CourseItem = styled.div`
    border: 1px solid #eee;
    padding: 0.5rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    .course-name {
        font-weight: bold;
    }
`;

const CourseDetailContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    color: #666;
`;

interface DifficultySpanProps {
    difficulty: string;
}

const DifficultySpan = styled.span<DifficultySpanProps>`
    color: ${({ difficulty }) => {
        switch (difficulty) {
            case "상급":
                return "#e74c3c"; // 빨간색
            case "중급":
                return "#f39c12"; // 주황색
            case "초급":
                return "#8fcf7d"; // 연두색
            default:
                return "#000"; // 기본 검정색
        }
    }};
`;

const PopularBadge = styled.span`
    background-color: #8bc34a;
    color: white;
    font-size: 0.75rem;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    margin-left: auto;
`;

const DetailLink = styled(Link)`
    display: block;
    width: 100%;
    margin-top: auto;
    padding: 0.75rem 0;
    background-color: #269386;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-weight: 500;
    text-decoration: none;

    &:hover {
        background-color: #1f7b6d;
    }
`;

const MateSectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    h2 {
        font-size: 1.1rem;
        margin: 0;
    }
`;

const MateMoreLink = styled.span`
    color: #888;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const MateGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
`;

const MateCard = styled.div`
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 1rem;
    background-color: #fafafa;

    .mountain {
        color: #269386;
        font-weight: bold;
    }
    p {
        margin: 0.5rem 0;
    }
    .club-info {
        color: #666;
        font-size: 0.875rem;
    }
`;

const Footer = styled.footer`
    background-color: #333;
    color: #fff;
    padding: 1rem;
    font-size: 0.875rem;
    line-height: 1.4;
    div + div {
        margin-top: 0.25rem;
    }
`;
