"use client";

import { useState } from "react";
import {
    Container,
    Title,
    FormWrapper,
    Label,
    Input,
    Button,
    TextArea,
} from "./page.styles";
import { useRouter } from "next/navigation";
import { MountainCreateDto } from "@/application/usecases/admin/mountain/dto/MountainCreateDto";

const MountainCreatePage = () => {
    const router = useRouter();
    const [mountain, setMountain] = useState<MountainCreateDto>({
        name: "",
        region: "",
        description: "",
    });

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setMountain((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(mountain);
        try {
            const response = await fetch("/api/admin/mountain", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(mountain),
            });

            if (response.ok) {
                alert("산 정보가 등록되었습니다.");
                router.push("/admin/mountain");
            } else {
                console.error("산 정보 등록에 실패했습니다.", response);
            }
        } catch (error) {
            console.error("Error creating mountain:", error);
        }
    };

    return (
        <Container>
            <Title>산 정보 등록</Title>
            <FormWrapper onSubmit={handleSubmit}>
                <Label htmlFor="name">산 이름</Label>
                <Input
                    id="name"
                    type="text"
                    name="name"
                    value={mountain.name}
                    onChange={handleChange}
                />

                <Label htmlFor="region">지역</Label>
                <Input
                    id="region"
                    type="text"
                    name="region"
                    value={mountain.region}
                    onChange={handleChange}
                />

                <Label htmlFor="description">설명</Label>
                <TextArea
                    id="description"
                    name="description"
                    value={mountain.description}
                    onChange={handleChange}
                />

                <Button type="submit">등록</Button>
            </FormWrapper>
        </Container>
    );
};

export default MountainCreatePage;
