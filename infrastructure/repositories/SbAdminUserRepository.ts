import { createClient } from "@/utils/supabase/server";
import { AdminUser } from "@/domain/entities/AdminUser";
import { AdminUserRepository } from "@/domain/repositories/AdminUserRepository";

export class SbAdminUserRepository implements AdminUserRepository {
    async getUsers(): Promise<AdminUser[]> {
        const supabase = await createClient();
        const { data: users, error } = await supabase.from("user").select();
        if (error) {
            throw new Error(error.message);
        }

        return users.map((user) => ({
            ...user,
            created_at: new Date(user.created_at),
        }));
    }

    async deleteUser(userId: string): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase
            .from("user")
            .delete()
            .eq("user_id", userId);
        if (error) {
            throw new Error(error.message);
        }
    }
}
