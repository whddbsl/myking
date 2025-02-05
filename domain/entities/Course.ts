export interface Course {
    course_id: number;
<<<<<<< HEAD
    mountain_id: number; // Foreign Key
    name: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    duration: number; // HH:MM:SS 형식
    distance: number; // 거리 (km 단위)
    popularity: number;
    image_url: string;
    latitude: number;
    longitude: number;
=======
    mountain_id: number;
    name: string;
    description: string;
    difficulty: "초급" | "중급" | "상급";
    distance: number;
    popularity: number;
    latitude: number;
    longitude: number;
    duration: number;
    image_url: string;
    created_at: Date;
>>>>>>> main
}
