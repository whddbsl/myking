"use client";

import * as Course from "./page.styles";
import { CreateButton } from "../mountain/page.styles";
import { useEffect, useState } from "react";
import { AdminCourseListDto } from "@/application/usecases/admin/course/dto/AdminCourseListDto";
import React from "react";

const CoursePage = () => {
    const [courses, setCourses] = useState<AdminCourseListDto[]>([]);

    useEffect(() => {
        fetch("/api/admin/course")
            .then((response) => response.json())
            .then((data) => setCourses(data));
    }, []);

    const [detailStates, setDetailStates] = useState<{
        [key: string]: boolean;
    }>({});

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
                console.error("Failed to delete course", response);
            }
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    return (
        <Course.Main>
            <Course.Table>
                <thead>
                    <Course.Tr>
                        <Course.Th>아이디</Course.Th>
                        <Course.Th>산 이름</Course.Th>
                        <Course.Th>코스 이름</Course.Th>
                        <Course.Th>높이 (km)</Course.Th>
                        <Course.Th>소요 시간 (분)</Course.Th>
                        <Course.Th>생성일</Course.Th>
                        <Course.Th>관리</Course.Th>
                    </Course.Tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <React.Fragment key={course.course_id}>
                            <Course.Tr key={course.course_id}>
                                <Course.Td>{course.course_id}</Course.Td>
                                <Course.Td>{course.mountain_name}</Course.Td>
                                <Course.Td>{course.name}</Course.Td>
                                <Course.Td>{course.distance}</Course.Td>
                                <Course.Td>{course.duration}</Course.Td>
                                <Course.Td>{course.created_at}</Course.Td>
                                <Course.Td>
                                    <Course.Button>수정</Course.Button>
                                    <Course.Button
                                        onClick={() =>
                                            handleDelete(
                                                course.course_id.toString()
                                            )
                                        }
                                    >
                                        삭제
                                    </Course.Button>
                                    <Course.Button
                                        onClick={() =>
                                            handleDetail(course.course_id)
                                        }
                                    >
                                        {detailStates[course.course_id]
                                            ? "▲ 상세 닫기"
                                            : "▼ 상세 보기"}
                                    </Course.Button>
                                </Course.Td>
                            </Course.Tr>
                            {detailStates[course.course_id] && (
                                <Course.Tr>
                                    <Course.Td colSpan={7}>
                                        <Course.DetailContainer>
                                            <Course.DetailImage
                                                src={course.image_url}
                                            />
                                            <Course.DetailText>
                                                <ul>
                                                    <li>
                                                        설명 :{" "}
                                                        {course.description}
                                                    </li>
                                                    <li>
                                                        위도 : {course.latitude}
                                                    </li>
                                                    <li>
                                                        경도 :{" "}
                                                        {course.longitude}
                                                    </li>
                                                    <li>
                                                        난이도 :{" "}
                                                        {course.difficulty}
                                                    </li>
                                                    <li>
                                                        인기 :{" "}
                                                        {course.popularity}
                                                    </li>
                                                </ul>
                                            </Course.DetailText>
                                        </Course.DetailContainer>
                                    </Course.Td>
                                </Course.Tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </Course.Table>
            <CreateButton>
                <Course.UnstyledLink href="/admin/course/create">
                    코스 추가
                </Course.UnstyledLink>
            </CreateButton>
        </Course.Main>
    );
};

export default CoursePage;
