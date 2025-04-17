export interface Party {
    party_id: number;
    creator_id: string;
    mountain_id: number;
    description: string;
    max_members: number;
    current_members: number;
    meeting_date: Date;
    end_date: Date;
    filter_state: "모집중" | "마감";
    filter_gender: string[];
    filter_age: string[];
    created_at: Date;
}
