"use client";

import { useEffect, useState } from "react";

import React from "react";
import * as S from "./page.styles";
import {
    FiEdit2,
    FiTrash2,
    FiChevronDown,
    FiChevronUp,
    FiPlus,
} from "react-icons/fi";
import { CourseListDto } from "@/application/usecases/admin/course/dto/CourseListDto";

const CoursePage = () => {
    const [courses, setCourses] = useState<CourseListDto[]>([]);
    const [detailStates, setDetailStates] = useState<{
        [key: string]: boolean;
    }>({});

    useEffect(() => {
        fetch("/api/admin/course")
            .then((response) => response.json())
            .then((data) => setCourses(data));
    }, []);

    const handleDetail = (id: number) => {
        setDetailStates((prevStates) => ({
            ...prevStates,
            [id]: !prevStates[id],
        }));
    };

    const handleDelete = async (course_id: string) => {
        try {
            const response = await fetch("/api/admin/course", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ course_id: course_id }),
            });

            if (response.ok) {
                setCourses((prevList) =>
                    prevList.filter(
                        (course) => course.course_id !== Number(course_id)
                    )
                );
            } else {
                console.error("Failed to delete course");
            }
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    return (
        <S.AdminContainer>
            <S.ContentWrapper>
                <S.Header>
                    <div>
                        <S.Title>코스 관리</S.Title>
                        <p>총 {courses.length}개의 코스가 등록되어 있습니다.</p>
                    </div>
                    <S.AddButton href="/admin/course/create">
                        <FiPlus size={20} />
                        새로운 코스 등록
                    </S.AddButton>
                </S.Header>

                <S.Table>
                    <S.Thead>
                        <S.Tr>
                            <S.Th>아이디</S.Th>
                            <S.Th>산 이름</S.Th>
                            <S.Th>코스 이름</S.Th>
                            <S.Th>높이 (km)</S.Th>
                            <S.Th>소요 시간</S.Th>
                            <S.Th>생성일</S.Th>
                            <S.Th>관리</S.Th>
                        </S.Tr>
                    </S.Thead>
                    <S.Tbody>
                        {courses.map((course) => (
                            <React.Fragment key={course.course_id}>
                                <S.Tr>
                                    <S.Td>{course.course_id}</S.Td>
                                    <S.Td>{course.mountain_name}</S.Td>
                                    <S.Td>{course.name}</S.Td>
                                    <S.Td>{course.distance}</S.Td>
                                    <S.Td>{course.duration}</S.Td>
                                    <S.Td>{course.created_at}</S.Td>
                                    <S.Td>
                                        <S.ActionButton
                                            className="edit"
                                            aria-label="수정"
                                        >
                                            <S.UnstyledLink
                                                href={`/admin/course/${course.course_id}/edit`}
                                            >
                                                <FiEdit2 size={18} />
                                            </S.UnstyledLink>
                                        </S.ActionButton>
                                        <S.ActionButton
                                            className="delete"
                                            onClick={() =>
                                                handleDelete(
                                                    course.course_id.toString()
                                                )
                                            }
                                            aria-label="삭제"
                                        >
                                            <FiTrash2 size={18} />
                                        </S.ActionButton>
                                        <S.ActionButton
                                            className="detail"
                                            onClick={() =>
                                                handleDetail(course.course_id)
                                            }
                                            aria-label="상세보기"
                                        >
                                            {detailStates[course.course_id] ? (
                                                <FiChevronUp size={18} />
                                            ) : (
                                                <FiChevronDown size={18} />
                                            )}
                                        </S.ActionButton>
                                    </S.Td>
                                </S.Tr>
                                {detailStates[course.course_id] && (
                                    <S.Tr>
                                        <S.Td colSpan={7}>
                                            <S.DetailContainer>
                                                <S.DetailImage
                                                    src={course.image_url}
                                                    alt={`${course.name} 이미지`}
                                                />
                                                <S.DetailText>
                                                    <ul>
                                                        <li>
                                                            설명:{" "}
                                                            {course.description}
                                                        </li>
                                                        <li>
                                                            위도:{" "}
                                                            {course.latitude}
                                                        </li>
                                                        <li>
                                                            경도:{" "}
                                                            {course.longitude}
                                                        </li>
                                                        <li>
                                                            난이도:{" "}
                                                            {course.difficulty}
                                                        </li>
                                                    </ul>
                                                </S.DetailText>
                                            </S.DetailContainer>
                                        </S.Td>
                                    </S.Tr>
                                )}
                            </React.Fragment>
                        ))}
                    </S.Tbody>
                </S.Table>
            </S.ContentWrapper>
        </S.AdminContainer>
    );
};

export default CoursePage;
