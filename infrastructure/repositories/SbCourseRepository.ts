import { createClient } from "@/utils/supabase/server";
import { CourseRepository } from "@/domain/repositories/CourseRepository";
import { Course } from "@/domain/entities/Course";

export class SbCourseRepository implements CourseRepository {
    async findByMountainId(mountainId: number): Promise<Course[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("course")
            .select(
                "course_id, name, description, mountain_id, difficulty, distance, popularity, image_url, latitude, longitude, duration"
            )
            .eq("mountain_id", mountainId);

        if (error) {
            throw new Error(`코스 조회 오류: ${error.message}`);
        }
        if (!data) {
            return [];
        }

        return data.map((c: any) => ({
            course_id: c.course_id,
            name: c.name,
            description: c.description,
            mountain_id: c.mountain_id,
            difficulty: c.difficulty,
            distance: c.distance,
            popularity: c.popularity,
            image_url: c.image_url || "",
            latitude: c.latitude,
            longitude: c.longitude,
            duration: c.duration,
        }));
    }
}
