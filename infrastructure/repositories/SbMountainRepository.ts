import { Mountain } from "@/domain/entities/Mountain";
import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { createClient } from "@/utils/supabase/server";
import { SearchMountainDto } from "@/application/usecases/mountainSearch/dto/SearchMountainDto";

export class SbMountainRepository implements MountainRepository {
    //산 상세정보 조회
    async getMountainDetailsById(mountainId: number): Promise<Mountain> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("mountain")
            .select("mountain_id, name, region, altitude, description, image_url,created_at")
            .eq("mountain_id", mountainId)
            .single();

        if (error) {
            throw new Error(`산 상세 조회 오류: ${error.message}`);
        }
        if (!data) {
            throw new Error(`해당 산(모든 컬럼이 null)이 존재하지 않습니다: ID=${mountainId}`);
        }

        // 반환: 단일 Mountain 객체
        return {
            mountain_id: data.mountain_id,
            name: data.name,
            region: data.region,
            altitude: data.altitude,
            description: data.description,
            image_url: data.image_url || "",
            created_at: data.created_at,
        };
    }
    //산 이름 검색
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
    async getMountains(): Promise<Mountain[]> {
        const supabase = await createClient();
        const { data: mountains, error } = await supabase
            .from("mountain")
            .select()
            .order("created_at", { ascending: false });
        if (error) {
            throw new Error(error.message);
        }
        return mountains.map((mountain) => ({
            ...mountain,
            created_at: new Date(mountain.created_at),
        }));
    }

    async getMountainById(mountainId: string): Promise<Mountain> {
        const supabase = await createClient();
        const { data: mountain, error } = await supabase
            .from("mountain")
            .select()
            .eq("mountain_id", mountainId)
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return {
            ...mountain,
            created_at: new Date(mountain.created_at),
        };
    }

    async deleteMountain(mountainId: string): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase.from("mountain").delete().eq("mountain_id", mountainId);
        if (error) {
            throw new Error(error.message);
        }
    }

    async createMountain(mountain: Mountain): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase
            .from("mountain")
            .insert([
                {
                    name: mountain.name,
                    region: mountain.region,
                    description: mountain.description,
                    altitude: mountain.altitude,
                    image_url: mountain.image_url,
                },
            ])
            .select();
        if (error) {
            throw new Error(error.message);
        }
    }

    async updateMountain(mountain: Mountain): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase
            .from("mountain")
            .update({
                name: mountain.name,
                region: mountain.region,
                description: mountain.description,
                altitude: mountain.altitude,
                image_url: mountain.image_url,
            })
            .eq("mountain_id", mountain.mountain_id);
        if (error) {
            throw new Error(error.message);
        }
    }
}
