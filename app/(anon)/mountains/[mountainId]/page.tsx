"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Script from "next/script";
import { useParams } from "next/navigation";
import { MountainWithCoursesDto } from "@/application/usecases/mountainDetails/dto/MountainWithCoursesDto";
import LoadingSpinner from "@/components/loadingSpinner/loadingSpinner";
import {
    PageContainer,
    MountainHeader,
    MountainImageWrapper,
    MountainTitle,
    MountainSubtitle,
    MountainInfo,
    SectionTitle,
    MapPlaceholder,
    CourseList,
    CourseCard,
} from "./page.style";

// 전역 타입 선언: Kakao 지도 API 사용을 위해 window.kakao의 타입 확장
declare global {
    interface Window {
        kakao: any;
    }
}

export default function MountainDetailPage() {
    const { mountainId } = useParams() as { mountainId: string };
    const [mountainDetails, setMountainDetails] = useState<MountainWithCoursesDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    // 산 상세 정보를 API에서 불러옵니다.
    useEffect(() => {
        const fetchMountainDetails = async () => {
            try {
                const response = await fetch(`/api/mountains/${mountainId}`);
                if (!response.ok) {
                    throw new Error("산 정보를 가져오는데 실패했습니다.");
                }
                const data: MountainWithCoursesDto = await response.json();
                setMountainDetails(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (mountainId) {
            fetchMountainDetails();
        }
    }, [mountainId]);

    // 예시: 5개의 마커 데이터 (좌표, 텍스트, URL)
    const markersData = [
        {
            lat: 38.119444,
            lng: 128.465833,
            text: "설악산 대청봉",
            url: "https://map.kakao.com/link/map/설악산 대청봉,38.119444,128.465833",
        },
        {
            lat: 38.087222,
            lng: 128.466667,
            text: "오색 코스 시작점",
            url: "https://place.map.kakao.com/21627184",
        },
        {
            lat: 38.121389,
            lng: 128.418611,
            text: "한계령 코스 시작점",
            url: "https://place.map.kakao.com/21627117",
        },
        {
            lat: 38.1596,
            lng: 128.4657,
            text: "소공원 코스 시작점",
            url: "https://map.kakao.com/link/map/소공원 코스 시작점,38.164444,128.591111",
        },
        {
            lat: 38.1296,
            lng: 128.4957,
            text: "울산바위 코스 시작점",
            url: "https://map.kakao.com/link/map/울산바위 코스 시작점,38.170278,128.564722",
        },
    ];

    // 지도 스크립트 로드 후 하드코딩된 마커들을 지도에 추가합니다.
    useEffect(() => {
        if (mapLoaded && window.kakao && mapContainerRef.current) {
            const container = mapContainerRef.current;
            // 첫 번째 마커의 좌표를 중심으로 설정합니다.
            const center = new window.kakao.maps.LatLng(markersData[0].lat, markersData[0].lng);
            const options = {
                center: center,
                level: 9,
            };
            const map = new window.kakao.maps.Map(container, options);

            markersData.forEach((markerData, index) => {
                const markerPosition = new window.kakao.maps.LatLng(markerData.lat, markerData.lng);
                // 기본 마커 옵션
                const markerOptions: any = {
                    map: map,
                    position: markerPosition,
                };

                // 첫 번째 마커는 커스텀 마커 이미지로 변경
                if (index === 0) {
                    const imageSrc = "/images/location-pin.svg";
                    const imageSize = new window.kakao.maps.Size(36, 37);
                    const imageOption = { offset: new window.kakao.maps.Point(18, 37) };
                    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
                    markerOptions.image = markerImage;
                }

                const marker = new window.kakao.maps.Marker(markerOptions);

                // 마커 클릭 시 지정한 URL로 이동
                window.kakao.maps.event.addListener(marker, "click", () => {
                    window.location.href = markerData.url;
                });

                // 커스텀 오버레이를 생성하여 마커 위에 텍스트 표시
                const overlayContent = `<div style="padding: 2px 5px; background-color: #fff; border: 1px solid #ccc; font-size: 12px; color: #333;">${markerData.text}</div>`;
                const customOverlay = new window.kakao.maps.CustomOverlay({
                    position: markerPosition,
                    content: overlayContent,
                    yAnchor: 3.1,
                });
                customOverlay.setMap(map);
            });
        }
    }, [mapLoaded]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <PageContainer>오류 발생: {error}</PageContainer>;
    }

    if (!mountainDetails) {
        return <PageContainer>해당 산 정보를 찾을 수 없습니다.</PageContainer>;
    }

    const { courses, ...mountain } = mountainDetails;
    const sortedCourses = courses.sort((a, b) => (a.course_id ?? 0) - (b.course_id ?? 0));

    return (
        <PageContainer>
            {/* Kakao 지도 API 스크립트 로드 */}
            <Script
                src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=b606c5c9bbca5b1302e313439454e26f&autoload=false"
                strategy="afterInteractive"
                onLoad={() => {
                    window.kakao.maps.load(() => {
                        setMapLoaded(true);
                    });
                }}
            />

            <MountainHeader>
                <div>
                    <MountainTitle>{mountain.name}</MountainTitle>
                    <MountainSubtitle>
                        {mountain.altitude}m · {mountain.region}
                    </MountainSubtitle>
                </div>
                <MountainImageWrapper>
                    {mountain.image_url?.match(/^https?:\/\//) && (
                        // next/image에서 fill 속성을 사용하여 컨테이너에 맞춰 이미지를 채웁니다.
                        <Image
                            src={mountain.image_url}
                            alt={`${mountain.name} 이미지`}
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                        />
                    )}
                </MountainImageWrapper>
            </MountainHeader>
            <MountainInfo>{mountain.description}</MountainInfo>

            <SectionTitle>{mountain.name} 지도</SectionTitle>
            <MapPlaceholder ref={mapContainerRef} />

            <SectionTitle>등산 코스 목록</SectionTitle>
            <CourseList>
                {sortedCourses.length === 0 ? (
                    <p>등록된 코스가 없습니다.</p>
                ) : (
                    sortedCourses.map((course) => (
                        <CourseCard key={course.course_id}>
                            <div className="course-top">
                                <div className="course-info">
                                    <h3>{course.name}</h3>
                                    <p>난이도: {course.difficulty}</p>
                                    <p>거리: {course.distance}km</p>
                                    <p>소요 시간: {course.duration}시간</p>
                                </div>
                                {course.image_url?.match(/^https?:\/\//) && (
                                    <div className="course-image">
                                        <Image
                                            src={course.image_url}
                                            alt={`${course.name} 이미지`}
                                            width={160}
                                            height={110}
                                            style={{ objectFit: "cover", borderRadius: "9px" }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="course-description">
                                <p>{course.description}</p>
                            </div>
                        </CourseCard>
                    ))
                )}
            </CourseList>
        </PageContainer>
    );
}
