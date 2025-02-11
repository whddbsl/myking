export interface Course {
    course_id: number;
    mountain_id: number; // Foreign Key
    name: string;
    description: string;
    difficulty: "초급" | "중급" | "상급";
    distance: number; // 거리 (km 단위)
    popularity: number;
    latitude: number;
    longitude: number;
    duration: number; // HH:MM:SS 형식
    image_url: string;
    created_at: Date;
}
