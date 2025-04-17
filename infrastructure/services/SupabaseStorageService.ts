import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export class SupabaseStorageService {
    async uploadImage(file: File, directory: string): Promise<string> {
        const { data, error } = await supabase.storage
            .from("images")
            .upload(`${directory}/${file.name}`, file);
        if (error) {
            throw new Error(`Error uploading file: ${error.message}`);
        }
        const {
            data: { publicUrl },
        } = supabase.storage
            .from("images")
            .getPublicUrl(`${directory}/${file.name}`);

        return publicUrl;
    }

    async uploadProfileImage(file: File, kakaoId: string): Promise<string> {
        const { data: userData, error: userError } = await supabase
            .from("user")
            .select("profile_image")
            .eq("kakao_id", kakaoId)
            .single();

        if (userError) {
            console.error("Error fetching user data: ", userError);
        }

        if (userData?.profile_image) {
            const filePath = userData.profile_image.replace(
                `${supabase.storageUrl}/object/public/images/`,
                ""
            );
            if (filePath !== "user/member_default.svg") {
                await supabase.storage.from("images").remove([filePath]);
            }
        }

        const newFileName = `${kakaoId}-${file.name}`;

        const { data, error } = await supabase.storage
            .from("images")
            .upload(`user/${newFileName}`, file);

        if (error) {
            console.error("Error uploading profile image: ", error);
        } else {
            console.log("File uploaded successfully: ", data);
        }

        return `${supabase.storageUrl}/object/public/images/user/${newFileName}`;
    }
}
