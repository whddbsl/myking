export interface Party {
    party_id: number;
    creator_id: number;
    mountain_id: number;
    description: string;
    max_members: number;
    current_members: number;
    meeting_date: Date;
    end_date: Date;
    filter_state: string;
    filter_gender: "여성" | "남성" | "성별무관";
    filter_age: string[];
    created_at: Date;
}
