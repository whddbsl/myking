export interface CourseDetailDto {
    course_id: number;
    name: string;
    description: string;
    difficulty: "초급" | "중급" | "상급";
    distance: number;
    latitude: number;
    longitude: number;
    duration: number;
    image_url: string;
    mountain_name: string;
    mountain_id: number;
}
