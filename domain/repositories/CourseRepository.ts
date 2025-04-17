import { Course } from "../entities/Course";

//코스데이터를 조회하는데 필요한 계약을 정의하는 인터페이스
export interface CourseRepository {
    //산 ID로 코스 리스트 검색
    findByMountainId(mountainId: number): Promise<Course[]>; //반환값은 Course객체들의 배열
    getCourses(): Promise<Course[]>;
    getCourseById(course_id: number): Promise<Course>;
    createCourse(course: Course): Promise<void>;
    deleteCourse(course_id: number): Promise<void>;
    updateCourse(course: Course): Promise<void>;

    //코스 ID로 코스 정보 검색(선택적)
    //findById(courseId: number): Promise<Course | null>; //검색 성공하면
}

//CourseRepository의 역할
// 1.데이터 검색: 특정 산의 코스리스트 조회(findByMountainId).
// 2.코스 관련 데이터 로직:
//     - 코스 정보를 생성,업뎃,삭제
//     - 인기순,거리순 등의 정렬된 코스 리스트 반환
// 3. 데이터베이스 캡슐화: DB와 직접 통신하는 코드를 캡슐화 하여 Usecase와 분리
