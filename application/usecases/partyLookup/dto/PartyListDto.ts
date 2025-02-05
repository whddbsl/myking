export interface PartyListDto {
    party_id: string;
    creator_id: number;
    mountain_id: number;
    max_members: number;
    meeting_date: string;
    end_date: string;
    filter_state: "모집중" | "마감";
    filter_gender: "여성" | "남성" | "성별무관";
    filter_age: string[];
    timeLabel: string;
}
