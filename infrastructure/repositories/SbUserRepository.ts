import { User } from "../../domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { createClient } from "@/utils/supabase/server";

export class SbUserRepository implements UserRepository {
    async create(user: User): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase.from("user").insert({
            nickname: user.nickname,
            name: user.name,
            profile_image: user.profile_image,
            kakao_id: user.kakao_id,
        });

        if (error) {
            throw new Error(`사용자 정보 저장 실패: ${error.message}`);
        }
    }

    async findByNickname(nickname: string): Promise<boolean> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("user")
            .select("*")
            .eq("nickname", nickname)
            .single();

        if (error) {
            return false;
        }

        return true;
    }

    async findById(kakaoId: string): Promise<User> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("user")
            .select("*")
            .eq("kakao_id", kakaoId)
            .single();

        if (error || !data) {
            throw new Error(`User not found with kakao_id: ${kakaoId}`);
        }

        return data;
    }
    async getUsers(): Promise<User[]> {
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

    async updateNickname(kakaoId: string, newNickname: string): Promise<User> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("user")
            .update({ nickname: newNickname }, { count: "exact" })
            .eq("kakao_id", kakaoId)
            .select("*")
            .single();

        if (error || !data) {
            throw new Error(
                `Failed to update nickname for kakao_id: ${kakaoId}`
            );
        }

        console.log("닉네임 업데이트 성공: ", newNickname);
        return data;
    }

    async updateNicknameAndProfileImage(
        kakaoId: string,
        newNickname: string,
        profileImage: string
    ): Promise<User> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("user")
            .update({ nickname: newNickname, profile_image: profileImage })
            .eq("kakao_id", kakaoId)
            .select("*")
            .single();

        if (error || !data) {
            throw new Error(
                `Failed to update nickname and profile image for kakao_id: ${kakaoId}`
            );
        }

        console.log("닉네임과 프로필 사진 업데이트 성공: ", data);
        return data;
    }

    async updateProfileImage(
        kakaoId: string,
        profileImage: string
    ): Promise<User> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("user")
            .update({ profile_image: profileImage })
            .eq("kakao_id", kakaoId)
            .select("*")
            .single();

        if (error) {
            console.error("Failed to fetch update profile image: ", error);
        }

        if (!data) {
            throw new Error(
                `Failed to update profile image for kakao_id: ${kakaoId}`
            );
        }

        console.log("프로필 사진 업데이트 성공: ", data);
        return data;
    }

    async getUserByUuid(userId: string): Promise<User> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("user")
            .select("*")
            .eq("user_id", userId)
            .single();

        if (error) {
            console.error("Failed to fetch user: ", error.message);
        }

        return data as User;
    }
}
