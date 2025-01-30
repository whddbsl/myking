import { AdminMountainList } from "@/domain/entities/AdminMountainList";
import { AdminMountainCreate } from "@/domain/entities/AdminMountainCreate";
import { AdminMountainRepository } from "@/domain/repositories/AdminMountainRepository";
import { createClient } from "@/utils/supabase/server";
import { AdminMountain } from "@/domain/entities/AdminMountain";
import { AdminMountainUpdate } from "@/domain/entities/AdminMountainUpdate";
export class SbAdminMountainRepository implements AdminMountainRepository {
    async getMountains(): Promise<AdminMountainList[]> {
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

    async getMountainById(mountainId: string): Promise<AdminMountain> {
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

    async updateMountain(mountain: AdminMountainUpdate): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase
            .from("mountain")
            .update({
                mountain_id: mountain.mountain_id,
                name: mountain.name,
                region: mountain.region,
                description: mountain.description,
            })
            .eq("mountain_id", mountain.mountain_id);
        if (error) {
            throw new Error(error.message);
        }
    }
}
