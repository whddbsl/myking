import { SbMountainRepository } from "@/infrastructure/repositories/SbMountainRepository";
import { SearchMountainDto } from "./dto/SearchMountainDto";
import { SearchMountainRequestDto } from "./dto/SearchMountainRequestDto";

// Repository 인스턴스 생성
const mountainRepository = new SbMountainRepository();

//검색 요청을 처리하는 핵심 함수
export const executeMountainSearch = async (request: SearchMountainRequestDto): Promise<SearchMountainDto[]> => {
    const { query } = request; // 요청에서 검색어(query) 추출

    // 검색어 검증: 검색어가 비어 있거나 공백만 있는 경우 에러를 발생시킴
    if (!query || query.trim().length === 0) {
        throw new Error("검색어는 비어 있을 수 없습니다.");
    }
    // Repository를 통해 데이터 검색: 검색어를 기반으로 Supabase에서 데이터를 가져옴
    return await mountainRepository.searchByName(query);
};

// // 테스트 함수: Supabase와의 통신 및 검색 기능을 테스트하기 위한 함수
// const testMountainSearch = async () => {
//     try {
//         // 테스트용 검색 요청 생성
//         const testRequest: SearchMountainRequestDto = { query: "설악산" }; // 테스트 검색어

//         // executeMountainSearch 호출: 검색 결과를 가져옴
//         const results = await executeMountainSearch(testRequest);

//         // 검색 결과 출력
//         console.log("검색 결과:", results);
//     } catch (error) {
//         // 에러 발생 시 메시지 출력
//         console.error("테스트 실패:", error);
//     }
// };

// // 테스트 함수 실행
// // 이 함수는 파일이 실행될 때 자동으로 호출되어 Supabase와의 통신 여부를 확인
// testMountainSearch();
