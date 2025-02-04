import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export class SupabaseStorageService {
    async uploadImage(file: File): Promise<string> {
        const { data, error } = await supabase.storage
            .from("images")
            .upload(`courses/${file.name}`, file);
        if (error) {
            console.error("Error uploading file:", error);
        } else {
            console.log("File uploaded successfully:", data);
        }
        return `${supabase.storageUrl}/object/public/images/courses/${file.name}`;
    }
}
