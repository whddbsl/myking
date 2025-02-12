"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import styled from "styled-components";
import { MountainWithCoursesDto } from "@/application/usecases/mountainDetails/dto/MountainWithCoursesDto";
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

export default function MountainDetailPage() {
    const { mountainId } = useParams() as { mountainId: string };

    const [mountainDetails, setMountainDetails] = useState<MountainWithCoursesDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) {
        return <PageContainer>로딩 중...</PageContainer>;
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
            <MountainHeader>
                <MountainImageWrapper>
                    {mountain.image_url?.match(/^https?:\/\//) && (
                        <Image
                            src={mountain.image_url}
                            alt={`${mountain.name} 이미지`}
                            width={400}
                            height={300}
                            style={{ objectFit: "cover" }}
                            priority
                        />
                    )}
                </MountainImageWrapper>
                <div>
                    <MountainTitle>{mountain.name}</MountainTitle>
                    <MountainSubtitle>
                        {mountain.altitude}m · {mountain.region}
                    </MountainSubtitle>
                </div>
            </MountainHeader>
            <MountainInfo>{mountain.description}</MountainInfo>

            <SectionTitle>북한산 지도</SectionTitle>
            <MapPlaceholder>지도 영역 (추후 추가 예정)</MapPlaceholder>

            <SectionTitle>등산 코스 목록</SectionTitle>
            <CourseList>
                {sortedCourses.length === 0 ? (
                    <p>등록된 코스가 없습니다.</p>
                ) : (
                    sortedCourses.map((course) => (
                        <CourseCard key={course.course_id}>
                            <h3>{course.name}</h3>
                            <p>난이도: {course.difficulty}</p>
                            <p>거리: {course.distance}km</p>
                            <p>소요 시간: {course.duration}</p>
                            {course.popularity && <p>인기도: {course.popularity}</p>}
                            {course.image_url?.match(/^https?:\/\//) && (
                                <Image
                                    src={course.image_url}
                                    alt={`${course.name} 이미지`}
                                    width={200}
                                    height={150}
                                    style={{ objectFit: "cover" }}
                                />
                            )}
                            <p>{course.description}</p>
                        </CourseCard>
                    ))
                )}
            </CourseList>
        </PageContainer>
    );
}
