export interface Course {
    course_id: number;
    mountain_id: number; // Foreign Key
    name: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    duration: string; // HH:MM:SS 형식
    distance: number; // 거리 (km 단위)
    popularity: number;
    image_url: string;
    latitude: number;
    longitude: number;
}
