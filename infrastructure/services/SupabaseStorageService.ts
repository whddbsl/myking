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
}
