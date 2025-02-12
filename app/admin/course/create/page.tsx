"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as S from "./page.styles";

import { CourseCreateDto } from "@/application/usecases/admin/course/dto/CourseCreateDto";
import { MountainListDto } from "@/application/usecases/admin/course/dto/MountainListDto";
import { useRouter } from "next/navigation";

const CreateCoursePage: React.FC = () => {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [mountain, setMountain] = useState<MountainListDto[]>([]);

    useEffect(() => {
        fetch("/api/admin/course/create")
            .then((response) => response.json())
            .then((data) => {
                setMountain(data);
            });
    }, []);

    const [course, setCourse] = useState<CourseCreateDto>({
        name: "",
        mountain_id: 0,
        description: "",
        difficulty: "초급",
        distance: 0,
        latitude: 0,
        longitude: 0,
        duration: 0,
        image_url: "",
    });

    const handleChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setCourse((prevCourse) => ({
            ...prevCourse,
            [name]: value,
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            console.error("파일이 선택되지 않았습니다.");
            return;
        }

        const formData = new FormData();

        formData.append("name", course.name);
        formData.append("mountain_id", course.mountain_id.toString());
        formData.append("description", course.description);
        formData.append("difficulty", course.difficulty);
        formData.append("distance", course.distance.toString());
        formData.append("latitude", course.latitude.toString());
        formData.append("longitude", course.longitude.toString());
        formData.append("duration", course.duration.toString());
        formData.append("file", file);

        try {
            const response = await fetch("/api/admin/course/create", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                alert("코스 정보가 등록되었습니다.");
                router.push("/admin/course");
            } else {
                console.error("Failed to create course:", result.error);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <S.AdminContainer>
            <S.ContentWrapper>
                <S.Header>
                    <div>
                        <S.Title>코스 등록하기</S.Title>
                        <p>새로운 코스의 정보를 등록합니다.</p>
                    </div>
                </S.Header>
                <S.FormWrapper onSubmit={handleSubmit}>
                    <S.FormGroup>
                        <S.Label htmlFor="name">코스 이름</S.Label>
                        <S.Input
                            id="name"
                            type="text"
                            name="name"
                            value={course.name}
                            onChange={handleChange}
                        />
                    </S.FormGroup>
                    <S.FormGroup>
                        <S.Label htmlFor="mountain_id">산 이름</S.Label>
                        <S.Select
                            id="mountain_id"
                            name="mountain_id"
                            value={course.mountain_id}
                            onChange={handleChange}
                        >
                            {mountain.map((item) => (
                                <option
                                    key={item.mountain_id}
                                    value={item.mountain_id}
                                >
                                    {item.name}
                                </option>
                            ))}
                        </S.Select>
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label htmlFor="description">코스 설명</S.Label>
                        <S.TextArea
                            id="description"
                            name="description"
                            value={course.description}
                            onChange={handleChange}
                        />
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label htmlFor="difficulty">난이도</S.Label>
                        <S.Select
                            id="difficulty"
                            name="difficulty"
                            value={course.difficulty}
                            onChange={handleChange}
                        >
                            <option value="초급">초급</option>
                            <option value="중급">중급</option>
                            <option value="상급">상급</option>
                        </S.Select>
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label htmlFor="distance">거리</S.Label>
                        <S.Input
                            id="distance"
                            type="number"
                            name="distance"
                            value={course.distance}
                            onChange={handleChange}
                        />
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label htmlFor="latitude">위도</S.Label>
                        <S.Input
                            id="latitude"
                            type="number"
                            name="latitude"
                            value={course.latitude}
                            onChange={handleChange}
                        />
                    </S.FormGroup>
                    <S.FormGroup>
                        <S.Label htmlFor="longitude">경도</S.Label>
                        <S.Input
                            id="longitude"
                            type="number"
                            name="longitude"
                            value={course.longitude}
                            onChange={handleChange}
                        />
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label htmlFor="duration">소요시간</S.Label>
                        <S.Input
                            id="duration"
                            type="number"
                            name="duration"
                            value={course.duration}
                            onChange={handleChange}
                        />
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label htmlFor="file">파일</S.Label>
                        <S.Input
                            id="file"
                            type="file"
                            onChange={handleFileChange}
                        />
                    </S.FormGroup>

                    <S.Button type="submit">등록</S.Button>
                </S.FormWrapper>
            </S.ContentWrapper>
        </S.AdminContainer>
    );
};

export default CreateCoursePage;
