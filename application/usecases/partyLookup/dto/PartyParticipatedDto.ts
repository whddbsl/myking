export interface UserDto {
    name: string;
    nickname: string;
    profile_image: string;
    created_at: string;
    user_id: string;
    kakao_id: string;
}

export interface PartyMyParticipatedDto {
    party_id: string;
    creator_id: string;
    mountain_id: number;
    current_members: number;
    created_at: string;
    max_members: number;
    meeting_date: string;
    end_date: string;
    end_day: string;
    filter_state: "모집중" | "마감";
    filter_gender: string[];
    filter_age: string[];
    timeLabel: string;
    user: UserDto;
}
