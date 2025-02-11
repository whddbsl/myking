export interface PartyDetailDto {
    party_id: number;
    user_id: string[];
    creator_id: string;
    creator_nickname: string;
    creator_image: string;
    mountain_id: number;
    mountain_name: string;
    description: string;
    max_members: number;
    current_members: number;
    meeting_date: string;
    end_date: string;
    filter_state: string;
    filter_gender: string[];
    filter_age: string[];
    timeLabel: string;
}
