// infrastructure/repositories/SbMountainRepository.ts
import { createClient } from "@/utils/supabase/server";
import { SearchMountainDto } from "@/application/usecases/mountainSearch/dto/SearchMountainDto";

export class SbMountainRepository {
    // private async getSupabaseClient() {
    //     return await createClient(); // 서버 환경에 맞는 Supabase 클라이언트 생성
    // }

    async searchByName(query: string): Promise<SearchMountainDto[]> {
        const supabase = await createClient();

        // Supabase에서 산 이름 검색
        const { data, error } = await supabase
            .from("mountain") // 테이블 이름 수정: 단수형
            .select("mountain_id, name, region, altitude, description, image_url")
            .ilike("name", `%${query}%`); // 이름 검색 (부분 일치)

        if (error) {
            throw new Error(`Supabase 검색 오류: ${error.message}`);
        }

        // 매핑 시, 실제 컬럼 이름에 맞춰 사용
        return data.map((mt: any) => ({
            mountain_id: mt.mountain_id,
            name: mt.name,
            region: mt.region,
            altitude: mt.altitude,
            description: mt.description,
            image_url: mt.image_url || "",
        }));
    }
}
