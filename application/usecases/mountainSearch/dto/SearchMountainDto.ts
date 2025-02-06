//산 검색 결과에서 반환될 데이터 구조 정의
export interface SearchMountainDto {
    mountain_id: number;
    name: string;
    region: string;
    altitude: number;
    description: string;
    image_url: string;
}
