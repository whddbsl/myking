export interface CourseListDto {
    course_id: number;
    name: string;
    description: string;
    difficulty: "초급" | "중급" | "상급";
    distance: number;
    latitude: number;
    longitude: number;
    duration: number;
    image_url: string;
    created_at: string;
    mountain_name: string;
    mountain_id: number;
}
