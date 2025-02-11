export interface PartyListDto {
    party_id: string;
    creator_id: number;
    creator_nickname: string;
    creator_image: string;
    mountain_id: number;
    mountain_name: string;
    max_members: number;
    meeting_date: string;
    end_date: string;
    filter_state: "모집중" | "마감";
    filter_gender: string[];
    filter_age: string[];
    timeLabel: string;
    description: string;
}
