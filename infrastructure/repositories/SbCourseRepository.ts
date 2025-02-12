import { Course } from "@/domain/entities/Course";
import { CourseRepository } from "@/domain/repositories/CourseRepository";
import { createClient } from "@/utils/supabase/server";
export class SbCourseRepository implements CourseRepository {
    async getCourses(): Promise<Course[]> {
        const supabase = await createClient();
        const { data: courses, error } = await supabase
            .from("course")
            .select()
            .order("created_at", { ascending: false });
        if (error) {
            throw new Error(error.message);
        }
        return courses.map((course) => ({
            ...course,
            created_at: new Date(course.created_at),
        }));
    }
    async getCourseById(course_id: number): Promise<Course> {
        const supabase = await createClient();
        const { data: course, error } = await supabase
            .from("course")
            .select()
            .eq("course_id", course_id)
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return course;
    }

    async createCourse(course: Course): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase.from("course").insert([
            {
                mountain_id: course.mountain_id,
                name: course.name,
                description: course.description,
                difficulty: course.difficulty,
                distance: course.distance,
                latitude: course.latitude,
                longitude: course.longitude,
                duration: course.duration,
                image_url: course.image_url,
            },
        ]);
        if (error) {
            throw new Error(error.message);
        }
    }
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
            created_at: c.created_at,
        }));
    }
    async deleteCourse(course_id: number): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase
            .from("course")
            .delete()
            .eq("course_id", course_id);
        if (error) {
            throw new Error(error.message);
        }
    }

    async updateCourse(course: Course): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase
            .from("course")
            .update({
                name: course.name,
                description: course.description,
                difficulty: course.difficulty,
                distance: course.distance,
                latitude: course.latitude,
                longitude: course.longitude,
                duration: course.duration,
                image_url: course.image_url,
            })
            .eq("course_id", course.course_id);
        if (error) {
            throw new Error(error.message);
        }
    }
}
