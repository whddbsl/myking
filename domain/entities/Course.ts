export interface Course {
    course_id: number;
<<<<<<< HEAD
    mountain_id: number; // Foreign Key
    name: string;
    description: string;
    difficulty: "초급" | "중급" | "상급";
    distance: number; // 거리 (km 단위)
    popularity: number;
    latitude: number;
    longitude: number;
    duration: number; // HH:MM:SS 형식
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
>>>>>>> 1ab4be9e7f3bd11e50418683ff7c6f9ac5784259
    image_url: string;
    created_at: Date;
}
