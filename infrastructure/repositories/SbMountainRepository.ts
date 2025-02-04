import { Mountain } from "@/domain/entities/Mountain";
import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { createClient } from "@/utils/supabase/server";

export class SbMountainRepository implements MountainRepository {
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
        const { error } = await supabase
            .from("mountain")
            .delete()
            .eq("mountain_id", mountainId);
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
