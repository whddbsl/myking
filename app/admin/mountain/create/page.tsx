"use client";

import { useState } from "react";
import * as S from "./page.styles";
import { useRouter } from "next/navigation";
import { MountainCreateDto } from "@/application/usecases/admin/mountain/dto/MountainCreateDto";
import { FiSave, FiX } from "react-icons/fi";
import { SupabaseStorageService } from "@/infrastructure/services/SupabaseStorageService";

const MountainCreatePage = () => {
    const router = useRouter();
    const [mountain, setMountain] = useState<MountainCreateDto>({
        name: "",
        region: "",
        description: "",
        altitude: 0,
        image_url: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setMountain((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let imageUrl = mountain.image_url;

            if (imageFile) {
                const storageService = new SupabaseStorageService();
                imageUrl = await storageService.uploadImage(
                    imageFile,
                    "mountains"
                );
            }

            const response = await fetch("/api/admin/mountain/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...mountain, image_url: imageUrl }),
            });

            if (response.ok) {
                alert("산 정보가 등록되었습니다.");
                router.push("/admin/mountain");
            } else {
                console.error("산 정보 등록에 실패했습니다.", response);
                alert("산 정보 등록에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error creating mountain:", error);
            alert("산 정보 등록 중 오류가 발생했습니다.");
        }
    };

    return (
        <S.AdminContainer>
            <S.ContentWrapper>
                <S.Header>
                    <div>
                        <S.Title>산 등록하기</S.Title>
                        <p>새로운 산의 정보를 등록합니다.</p>
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
                        <S.Label htmlFor="altitude">고도 (m)</S.Label>
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
                        <S.Label htmlFor="image">이미지</S.Label>
                        <S.Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                        {imagePreview && (
                            <S.ImagePreview>
                                <S.Image src={imagePreview} alt="미리보기" />
                            </S.ImagePreview>
                        )}
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
                            등록
                        </S.Button>
                    </S.ButtonGroup>
                </S.FormWrapper>
            </S.ContentWrapper>
        </S.AdminContainer>
    );
};

export default MountainCreatePage;
