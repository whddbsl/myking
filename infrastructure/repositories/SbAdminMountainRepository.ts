import { AdminMountain } from "@/domain/entities/AdminMountain";
import { AdminMountainCreate } from "@/domain/entities/AdminMountainCreate";
import { AdminMountainRepository } from "@/domain/repositories/AdminMountainRepository";
import { createClient } from "@/utils/supabase/server";

export class SbAdminMountainRepository implements AdminMountainRepository {
    async getMountains(): Promise<AdminMountain[]> {
        const supabase = await createClient();
        const { data: mountains, error } = await supabase
            .from("mountain")
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return mountains.map((mountain) => ({
            ...mountain,
            created_at: new Date(mountain.created_at),
        }));
    }

    async deleteMountain(mountainId: string): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase
            .from("mountain")
            .delete()
            .eq("mountain_id", mountainId);
        if (error) {
            throw new Error(error.message);
        }
    }

    async createMountain(mountain: AdminMountainCreate): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase
            .from("mountain")
            .insert([
                {
                    name: mountain.name,
                    region: mountain.region,
                    description: mountain.description,
                },
            ])
            .select();
        if (error) {
            throw new Error(error.message);
        }
    }
}
