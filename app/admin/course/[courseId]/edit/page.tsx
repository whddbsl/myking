"use client";

import { CourseUpdateDto } from "@/application/usecases/admin/course/dto/CourseUpdateDto";
import { SupabaseStorageService } from "@/infrastructure/services/SupabaseStorageService";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiSave, FiUpload, FiX } from "react-icons/fi";
import * as S from "./page.styles";

const EditCoursePage = () => {
    const { courseId } = useParams();

    const router = useRouter();
    const [course, setCourse] = useState<CourseUpdateDto>({
        course_id: 0,
        name: "",
        description: "",
        difficulty: "초급",
        distance: 0,
        latitude: 0,
        longitude: 0,
        duration: 0,
        image_url: "",
    });
    const [mountainName, setMountainName] = useState("");
    const [newImage, setNewImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const storageService = new SupabaseStorageService();

    useEffect(() => {
        fetch(`/api/admin/course/${courseId}/edit`)
            .then((response) => response.json())
            .then((data) => {
                setCourse({
                    course_id: data.course_id || 0,
                    name: data.name || "",
                    description: data.description || "",
                    difficulty: data.difficulty || "초급",
                    distance: data.distance || 0,
                    latitude: data.latitude || 0,
                    longitude: data.longitude || 0,
                    duration: data.duration || 0,
                    image_url: data.image_url || "",
                });
                setMountainName(data.mountain_name || "");
                setImagePreview(data.image_url || null);
            })
            .catch((error) => {
                console.error("데이터 로딩 중 오류 발생:", error);
                alert("코스 정보를 불러오는데 실패했습니다.");
            });
    }, [courseId]);

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setCourse((prevCourse) => ({
            ...prevCourse,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(course);
        try {
            const updatedCourse = { ...course };

            if (newImage) {
                try {
                    const imageUrl = await storageService.uploadImage(
                        newImage,
                        "mountains"
                    );
                    updatedCourse.image_url = imageUrl;
                } catch (error) {
                    console.error("이미지 업로드 중 오류:", error);
                    alert("이미지 업로드에 실패했습니다.");
                    return;
                }
            }

            const response = await fetch(`/api/admin/course/${courseId}/edit`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCourse),
            });

            const result = await response.json();

            if (response.ok) {
                console.log("Update successful:", result);
                alert("코스 정보가 수정되었습니다.");
                router.push("/admin/course");
            } else {
                console.error("Update failed:", result);
                alert(`코스 정보 수정에 실패했습니다: ${result.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("코스 정보 수정 중 오류가 발생했습니다.");
        }
    };

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("파일 크기는 5MB를 초과할 수 없습니다.");
                return;
            }

            if (!file.type.startsWith("image/")) {
                alert("이미지 파일만 업로드 가능합니다.");
                return;
            }

            setNewImage(file);
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    };

    return (
        <S.AdminContainer>
            <S.ContentWrapper>
                <S.Header>
                    <S.Title>코스 수정하기</S.Title>
                    <p>코스의 정보를 수정합니다.</p>
                </S.Header>

                <S.FormWrapper onSubmit={handleSubmit}>
                    <S.FormGroup>
                        <S.Label>산 이름</S.Label>
                        <S.ReadOnlyField>{mountainName}</S.ReadOnlyField>
                    </S.FormGroup>
                    <S.FormGroup>
                        <S.Label htmlFor="name">코스 이름</S.Label>
                        <S.Input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="코스 이름을 입력하세요"
                            value={course.name}
                            onChange={handleChange}
                            required
                        />
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label htmlFor="description">설명</S.Label>
                        <S.TextArea
                            id="description"
                            name="description"
                            placeholder="코스에 대한 설명을 입력하세요"
                            value={course.description}
                            onChange={handleChange}
                            required
                        />
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label htmlFor="difficulty">난이도</S.Label>
                        <select
                            id="difficulty"
                            name="difficulty"
                            value={course.difficulty}
                            onChange={handleChange}
                            required
                        >
                            <option value="초급">초급</option>
                            <option value="중급">중급</option>
                            <option value="상급">상급</option>
                        </select>
                    </S.FormGroup>
                    <S.FormGroup>
                        <S.Label htmlFor="distance">거리</S.Label>
                        <S.Input
                            id="distance"
                            type="number"
                            name="distance"
                            placeholder="코스 거리를 입력하세요"
                            value={course.distance}
                            onChange={handleChange}
                            required
                        />
                    </S.FormGroup>
                    <S.FormGroup>
                        <S.Label htmlFor="latitude">위도</S.Label>
                        <S.Input
                            id="latitude"
                            type="number"
                            name="latitude"
                            placeholder="코스 위도를 입력하세요"
                            value={course.latitude}
                            onChange={handleChange}
                            required
                        />
                    </S.FormGroup>
                    <S.FormGroup>
                        <S.Label htmlFor="longitude">경도</S.Label>
                        <S.Input
                            id="longitude"
                            type="number"
                            name="longitude"
                            placeholder="코스 경도를 입력하세요"
                            value={course.longitude}
                            onChange={handleChange}
                            required
                        />
                    </S.FormGroup>
                    <S.FormGroup>
                        <S.Label htmlFor="duration">소요시간</S.Label>
                        <S.Input
                            id="duration"
                            type="number"
                            name="duration"
                            placeholder="코스 소요시간을 입력하세요"
                            value={course.duration}
                            onChange={handleChange}
                            required
                        />
                    </S.FormGroup>
                    <S.FormGroup>
                        <S.Label>이미지</S.Label>
                        <S.ImagePreviewWrapper>
                            <S.CurrentImage>
                                {imagePreview && (
                                    <S.Image
                                        src={imagePreview}
                                        alt="Mountain preview"
                                    />
                                )}
                            </S.CurrentImage>
                            <S.HiddenFileInput
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <S.ImageUploadLabel htmlFor="image-upload">
                                <FiUpload size={18} />
                                {imagePreview
                                    ? "이미지 변경하기"
                                    : "이미지 업로드"}
                            </S.ImageUploadLabel>
                        </S.ImagePreviewWrapper>
                    </S.FormGroup>

                    <S.ButtonGroup>
                        <S.CancelButton
                            type="button"
                            onClick={() => router.back()}
                        >
                            <FiX size={18} />
                            취소
                        </S.CancelButton>
                        <S.Button type="submit">
                            <FiSave size={18} />
                            저장
                        </S.Button>
                    </S.ButtonGroup>
                </S.FormWrapper>
            </S.ContentWrapper>
        </S.AdminContainer>
    );
};

export default EditCoursePage;
