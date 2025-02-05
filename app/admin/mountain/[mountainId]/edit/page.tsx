"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MountainCreateDto } from "@/application/usecases/admin/mountain/dto/MountainCreateDto";
import { FiSave, FiX, FiUpload } from "react-icons/fi";
import * as S from "./page.styles";
import { SupabaseStorageService } from "@/infrastructure/services/SupabaseStorageService";

const EditMountainPage = () => {
    const { mountainId } = useParams();
    const router = useRouter();
    const [mountain, setMountain] = useState<MountainCreateDto>({
        name: "",
        region: "",
        description: "",
        altitude: 0,
        image_url: "",
    });
    const [newImage, setNewImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const storageService = new SupabaseStorageService();

    useEffect(() => {
        fetch(`/api/admin/mountain/${mountainId}/edit`)
            .then((response) => response.json())
            .then((data) => {
                setMountain({
                    name: data.name || "",
                    region: data.region || "",
                    description: data.description || "",
                    altitude: data.altitude || 0,
                    image_url: data.image_url || "",
                });
                setImagePreview(data.image_url || null);
            });
    }, [mountainId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setMountain((prevMountain) => ({
            ...prevMountain,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const updatedMountain = { ...mountain };

            if (newImage) {
                try {
                    const imageUrl = await storageService.uploadImage(
                        newImage,
                        "mountains"
                    );
                    updatedMountain.image_url = imageUrl;
                } catch (error) {
                    console.error("이미지 업로드 중 오류:", error);
                    alert("이미지 업로드에 실패했습니다.");
                    return;
                }
            }

            const response = await fetch(
                `/api/admin/mountain/${mountainId}/edit`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedMountain),
                }
            );

            const result = await response.json();

            if (response.ok) {
                console.log('Update successful:', result);
                alert("산 정보가 수정되었습니다.");
                router.push("/admin/mountain");
            } else {
                console.error('Update failed:', result);
                alert(`산 정보 수정에 실패했습니다: ${result.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("산 정보 수정 중 오류가 발생했습니다.");
        }
    };

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            // 파일 크기 체크 (예: 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert("파일 크기는 5MB를 초과할 수 없습니다.");
                return;
            }

            // 이미지 파일 타입 체크
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
                    <div>
                        <S.Title>산 수정하기</S.Title>
                        <p>산의 정보를 수정합니다.</p>
                    </div>
                </S.Header>

                <S.FormWrapper onSubmit={handleSubmit}>
                    <S.FormGroup>
                        <S.Label htmlFor="name">산 이름</S.Label>
                        <S.Input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="산 이름을 입력하세요"
                            value={mountain.name}
                            onChange={handleChange}
                            required
                        />
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label htmlFor="region">지역</S.Label>
                        <S.Input
                            id="region"
                            type="text"
                            name="region"
                            placeholder="지역을 입력하세요"
                            value={mountain.region}
                            onChange={handleChange}
                            required
                        />
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label htmlFor="altitude">고도</S.Label>
                        <S.Input
                            id="altitude"
                            type="number"
                            name="altitude"
                            placeholder="고도를 입력하세요"
                            value={mountain.altitude}
                            onChange={handleChange}
                            required
                        />
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label htmlFor="description">설명</S.Label>
                        <S.TextArea
                            id="description"
                            name="description"
                            placeholder="산에 대한 설명을 입력하세요"
                            value={mountain.description}
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

export default EditMountainPage;
