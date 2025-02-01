import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { createClient } from "@/utils/supabase/server";

export class SbUserRepository implements UserRepository {
    async create(user: User): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase.from("user").insert(user);

        if (error) {
            throw new Error(`사용자 정보 저장 실패: ${error.message}`);
        }
    }

    async findByNickname(nickname: string): Promise<User | null> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("user")
            .select("*")
            .eq("nickname", nickname)
            .single();

        if (error) {
            if (error.code === "PGRST116") return null;
            throw new Error(`Failed to find user: ${error.message}`);
        }

        return data as User;
    }

    async findById(kakaoId: string): Promise<User | null> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("user")
            .select("*")
            .eq("kakao_id", kakaoId)
            .maybeSingle();

        if (error) {
            console.error("Failed to fetch user: ", error.message);
            return null;
        }

        return data as User;
    }
}
