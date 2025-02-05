export interface PartyCreateDto {
    creator_id: string;
    mountain_id: number;
    description: string;
    max_members: number;
    meeting_date: string;
    end_date: string;
    filter_gender: "여성" | "남성" | "성별무관";
    filter_age: string[];
}
