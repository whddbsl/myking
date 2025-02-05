"use client";

import { useParams, useRouter } from "next/navigation";
import {
    Container,
    Title,
    FormWrapper,
    Label,
    Input,
    TextArea,
    Button,
} from "../../create/page.styles";
import { useEffect, useState } from "react";
import { MountainCreateDto } from "@/application/usecases/admin/mountain/dto/MountainCreateDto";

const EditMountainPage = () => {
    const { mountainId } = useParams();
    const router = useRouter();
    const [mountain, setMountain] = useState<MountainCreateDto>({
        name: "",
        region: "",
        description: "",
    });

    useEffect(() => {
        fetch(`/api/admin/mountain/${mountainId}/edit`)
            .then((response) => response.json())
            .then((data) => {
                setMountain({
                    name: data.name || "",
                    region: data.region || "",
                    description: data.description || "",
                });
            });
    }, [mountainId]);

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
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
            const response = await fetch(
                `/api/admin/mountain/${mountainId}/edit`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(mountain),
                }
            );

            if (response.ok) {
                alert("산 정보가 수정되었습니다.");
                router.push("/admin/mountain");
            } else {
                console.error("산 정보 수정에 실패했습니다.", response);
            }
        } catch (error) {
            console.error("Error updating mountain:", error);
        }
    };
    return (
        <Container>
            <Title>산 수정하기</Title>
            <FormWrapper onSubmit={handleSubmit}>
                <Label htmlFor="name">산 이름</Label>
                <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="산 이름"
                    value={mountain.name || ""}
                    onChange={handleChange}
                />
                <Label htmlFor="region">지역</Label>
                <Input
                    id="region"
                    type="text"
                    name="region"
                    placeholder="지역"
                    value={mountain.region || ""}
                    onChange={handleChange}
                />
                <Label htmlFor="description">설명</Label>
                <TextArea
                    id="description"
                    name="description"
                    placeholder="설명"
                    value={mountain.description || ""}
                    onChange={handleChange}
                />
                <Button type="submit">수정</Button>
            </FormWrapper>
        </Container>
    );
};

export default EditMountainPage;
