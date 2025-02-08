"use client";

import { useUserStore } from "@/application/states/userStore";
import { getToken } from "@/utils/getToken";
import { useEffect } from "react";

export default function MyCreatedPage() {
    const { kakaoId } = useUserStore();

    useEffect(() => {
        const fetchList = async () => {
            const token = getToken();
            if (!token) return;

            try {
                const response = await fetch("/api/parties/myCreated", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error(
                        "내가 참여한 파티 목록을 가져오는 데 실패했습니다."
                    );
                }

                const data = await response.json();
                console.log(data);
            } catch (error: any) {
                console.error("내가 생성한 파티 목록 가져오기 실패: ", error);
            }
        };
        fetchList();
    }, []);
}
