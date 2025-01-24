"use client";

import { AdminMountainCreateDto } from "@/application/usecases/adminMountain/dto/AdminMountainCreateDto";
import { useState } from "react";

const MountainCreatePage = () => {
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
            } else {
                console.error("산 정보 등록에 실패했습니다.", response);
            }
        } catch (error) {
            console.error("Error creating mountain:", error);
        }
    };

    return (
        <div>
            <h1>산 정보 등록</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="산 이름"
                    value={mountain.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="region"
                    placeholder="지역"
                    value={mountain.region}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="설명"
                    value={mountain.description}
                    onChange={handleChange}
                />
                <button type="submit">등록</button>
            </form>
        </div>
    );
};

export default MountainCreatePage;
