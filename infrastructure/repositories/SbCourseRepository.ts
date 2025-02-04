import { CourseCreateDto } from "@/application/usecases/admin/course/dto/CourseCreateDto";
import { Course } from "@/domain/entities/Course";
import { createClient } from "@/utils/supabase/server";

export class SbCourseRepository {
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
    async createCourse(course: CourseCreateDto): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase.from("course").insert([
            {
                mountain_id: course.mountain_id,
                name: course.name,
                description: course.description,
                difficulty: course.difficulty,
                distance: course.distance,
                popularity: course.popularity,
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
}
