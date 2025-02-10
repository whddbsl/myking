"use client";

import { PartyMyParticipatedDto } from "@/application/usecases/partyLookup/dto/PartyParticipatedDto";
import { getToken } from "@/utils/getToken";
import { useEffect, useState } from "react";

export default function MyParticipatedPage() {
    const [partyList, setPartyList] = useState<PartyMyParticipatedDto[]>([]);

    useEffect(() => {
        const fetchList = async () => {
            const token = getToken();
            if (!token) return;

            try {
                const response = await fetch("/api/parties/participated", {
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
                setPartyList(data);
            } catch (error: any) {
                console.error("내가 생성한 파티 목록 가져오기 실패: ", error);
            }
        };

        fetchList();
    }, []);
}
