"use client";

import { useParams, useRouter } from "next/navigation";
import { Button, Main, Input, Form, H1 } from "../../create/page.styles";
import { useEffect, useState } from "react";
import { AdminMountainCreateDto } from "@/application/usecases/adminMountain/dto/AdminMountainCreateDto";

const EditMountainPage = () => {
    const { mountainId } = useParams();
    const router = useRouter();
    const [mountain, setMountain] = useState<AdminMountainCreateDto>({
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMountain((prevMountain) => ({
            ...prevMountain,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/admin/mountain/${mountainId}/edit`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(mountain),
            });

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
        <Main>
            <H1>산 수정하기</H1>
            <div>산이름 {mountain.name}</div>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="name"
                    placeholder="산 이름"
                    value={mountain.name || ""}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    name="region"
                    placeholder="지역"
                    value={mountain.region || ""}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    name="description"
                    placeholder="설명"
                    value={mountain.description || ""}
                    onChange={handleChange}
                />
                <Button type="submit">수정</Button>
            </Form>
        </Main>
    );
};

export default EditMountainPage;
