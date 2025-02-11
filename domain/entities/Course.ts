export interface Course {
    course_id: number;
    mountain_id: number;
    name: string;
    description: string;
    difficulty: "초급" | "중급" | "상급";
    distance: number;
    popularity: boolean;
    latitude: number;
    longitude: number;
    duration: number;
    image_url: string;
    created_at: Date;
}
