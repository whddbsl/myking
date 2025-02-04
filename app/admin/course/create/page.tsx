"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
    Container,
    Title,
    FormWrapper,
    Label,
    Input,
    TextArea,
    Select,
    Button,
} from "./page.styles";

import { useRouter } from "next/navigation";
import { CourseCreateDto } from "@/application/usecases/admin/course/dto/CourseCreateDto";
import { AdminMountainNameDto } from "@/application/usecases/admin/mountain/dto/AdminMountainNameDto";

const CreateCoursePage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter();

    const [mountainNames, setMountainNames] = useState<AdminMountainNameDto[]>(
        []
    );

    useEffect(() => {
        fetch("/api/admin/course/create")
            .then((response) => response.json())
            .then((data) => {
                setMountainNames(data);
            });
    }, []);

    const [course, setCourse] = useState<CourseCreateDto>({
        name: "",
        mountain_id: 0,
        description: "",
        difficulty: "초급",
        distance: 0,
        popularity: 0,
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
        formData.append("popularity", course.popularity.toString());
        formData.append("latitude", course.latitude.toString());
        formData.append("longitude", course.longitude.toString());
        formData.append("duration", course.duration.toString());
        formData.append("file", file);

        try {
            const response = await fetch("/api/admin/course", {
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
        <Container>
            <Title>코스 생성</Title>
            <FormWrapper onSubmit={handleSubmit}>
                <Label htmlFor="name">코스 이름</Label>
                <Input
                    id="name"
                    type="text"
                    name="name"
                    value={course.name}
                    onChange={handleChange}
                />

                <Label htmlFor="mountain_id">산 이름</Label>
                <Select
                    id="mountain_id"
                    name="mountain_id"
                    value={course.mountain_id}
                    onChange={handleChange}
                >
                    {mountainNames.map((mountain) => (
                        <option
                            key={mountain.mountain_id}
                            value={mountain.mountain_id}
                        >
                            {mountain.name}
                        </option>
                    ))}
                </Select>

                <Label htmlFor="description">코스 설명</Label>
                <TextArea
                    id="description"
                    name="description"
                    value={course.description}
                    onChange={handleChange}
                />

                <Label htmlFor="difficulty">난이도</Label>
                <Select
                    id="difficulty"
                    name="difficulty"
                    value={course.difficulty}
                    onChange={handleChange}
                >
                    <option value="초급">초급</option>
                    <option value="중급">중급</option>
                    <option value="고급">고급</option>
                </Select>

                <Label htmlFor="distance">거리</Label>
                <Input
                    id="distance"
                    type="number"
                    name="distance"
                    value={course.distance}
                    onChange={handleChange}
                />

                <Label htmlFor="popularity">인기</Label>
                <Input
                    id="popularity"
                    type="number"
                    name="popularity"
                    value={course.popularity}
                    onChange={handleChange}
                />

                <Label htmlFor="latitude">위도</Label>
                <Input
                    id="latitude"
                    type="number"
                    name="latitude"
                    value={course.latitude}
                    onChange={handleChange}
                />

                <Label htmlFor="longitude">경도</Label>
                <Input
                    id="longitude"
                    type="number"
                    name="longitude"
                    value={course.longitude}
                    onChange={handleChange}
                />

                <Label htmlFor="duration">소요시간 (분)</Label>
                <Input
                    id="duration"
                    type="number"
                    name="duration"
                    value={course.duration}
                    onChange={handleChange}
                />

                <Label htmlFor="file">파일</Label>
                <Input id="file" type="file" onChange={handleFileChange} />

                <Button type="submit">등록</Button>
            </FormWrapper>
        </Container>
    );
};

export default CreateCoursePage;
