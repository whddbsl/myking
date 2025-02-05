import { SbMountainRepository } from "@/infrastructure/repositories/SbMountainRepository";
import { SbCourseRepository } from "@/infrastructure/repositories/SbCourseRepository";
import { getMountainDetailsUsecase } from "@/application/usecases/mountainDetails/MountainDetailsUsecase";
import Image from "next/image";

type MountainDetailPageProps = {
    params: {
        mountainId: string;
    };
};
export default async function MountainDetailPage({ params }: MountainDetailPageProps) {
    const { mountainId } = await params; // params를 await로 처리

    const mountainIdNum = parseInt(mountainId, 10);
    if (isNaN(mountainIdNum)) {
        return <div>잘못된 산 ID입니다.</div>;
    }

    const mountainRepo = new SbMountainRepository();
    const courseRepo = new SbCourseRepository();

    const mountainData = await getMountainDetailsUsecase(mountainRepo, courseRepo, mountainIdNum);
    if (!mountainData || !mountainData.mountain) {
        return <div>해당 산을 찾을 수 없습니다.</div>;
    }

    const { mountain, courses } = mountainData;

    return (
        <div style={{ padding: 20 }}>
            <h1>{mountain.name}</h1>
            {mountain.image_url?.match(/^https?:\/\//) && (
                <Image
                    src={mountain.image_url}
                    alt={`${mountain.name} 이미지`}
                    width={400}
                    height={300}
                    style={{ objectFit: "cover" }}
                />
            )}
            <p>위치: {mountain.region}</p>
            <p>고도: {mountain.altitude}m</p>
            <p>{mountain.description}</p>

            <hr />
            <h2>등산 코스 목록</h2>
            {courses.length === 0 && <p>등록된 코스가 없습니다.</p>}
            {courses.map((course, index) => (
                <div
                    key={course.course_id ?? `course-${index}`}
                    style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}
                >
                    <h3>{course.name}</h3>
                    <p>난이도: {course.difficulty}</p>
                    <p>거리: {course.distance}km</p>
                    <p>소요 시간: {course.duration}시간</p>
                    <p>인기도: {course.popularity}</p>
                    {course.image_url?.match(/^https?:\/\//) && (
                        <Image
                            src={course.image_url}
                            alt={`${course.name} 이미지`}
                            width={200}
                            height={150}
                            style={{ objectFit: "cover" }}
                        />
                    )}
                    <p>{course.description}</p>
                </div>
            ))}
        </div>
    );
}
