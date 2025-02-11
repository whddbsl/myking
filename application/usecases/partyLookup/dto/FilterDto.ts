export interface FilterDto {
    mountain_id: number;
    filter_state: string;
    filter_gender: "여성" | "남성" | "성별무관";
    filter_age: string[];
}
