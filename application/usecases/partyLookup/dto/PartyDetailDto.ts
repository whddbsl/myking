export interface PartyDetailDto {
    party_id: string;
    //creator_image: string;
    //creator_name: string;
    mountain_id: number;
    description: string;
    max_members: number;
    current_members: number;
    meeting_date: string;
    end_date: string;
    filter_state: string;
    filter_gender: "여성" | "남성" | "성별무관";
    filter_age: string[];
    timeLabel: string;
}
