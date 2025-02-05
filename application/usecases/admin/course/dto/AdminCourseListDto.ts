export interface AdminCourseListDto {
    course_id: number;
    name: string;
    description: string;
    mountain_name: string;
    difficulty: "초급" | "중급" | "상급";
    distance: number;
    popularity: number;
    latitude: number;
    longitude: number;
    duration: number;
    image_url: string;
    created_at: string;
}
