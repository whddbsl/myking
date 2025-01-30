"use client";

import { AdminMountainCreateDto } from "@/application/usecases/adminMountain/dto/AdminMountainCreateDto";
import { useState } from "react";
import { Button, Main, Input, Form, H1 } from "./page.styles";
import { useRouter } from "next/navigation";

const MountainCreatePage = () => {
    const router = useRouter();
    const [mountain, setMountain] = useState<AdminMountainCreateDto>({
        name: "",
        region: "",
        description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMountain((prevMountain) => ({
            ...prevMountain,
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
        <Main>
            <H1>산 정보 등록</H1>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="name"
                    placeholder="산 이름"
                    value={mountain.name}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    name="region"
                    placeholder="지역"
                    value={mountain.region}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    name="description"
                    placeholder="설명"
                    value={mountain.description}
                    onChange={handleChange}
                />
                <Button type="submit">등록</Button>
            </Form>
        </Main>
    );
};

export default MountainCreatePage;
