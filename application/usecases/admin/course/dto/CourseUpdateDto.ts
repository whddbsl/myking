export interface CourseUpdateDto {
    course_id: number;
    name: string;
    description: string;
    difficulty: "초급" | "중급" | "상급";
    distance: number;
    latitude: number;
    longitude: number;
    duration: number;
    image_url: string;
}