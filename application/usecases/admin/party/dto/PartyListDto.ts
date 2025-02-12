export interface PartyListDto {
    party_id: number;
    mountain_id: number;
    mountain_name: string;
    description: string;
    current_members: number;
    max_members: number;
    meeting_date: string;
    end_date: string;
    filter_gender: string[];
    filter_state: string;
    filter_age: string[];
    creator_id: string;
    participants: {
        nickname: string;
    }[];
    created_at: string;
}
