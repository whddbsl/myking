import { getMountainDetails } from "@/application/usecases/mountainDetails/MountainDetailsUsecase";

const MountainDetailPage = async ({ params }: { params: { mountainId: string } }) => {
    const data = await getMountainDetails({ mountain_id: Number(params.mountainId) });

    return (
        <div>
            <h1>{data.mountain.name}</h1>
            <img src={data.mountain.image_url} alt={data.mountain.name} />
            <p>{data.mountain.description}</p>
            <p>지역: {data.mountain.region}</p>
            <p>고도: {data.mountain.altitude}m</p>
            <h2>코스 목록</h2>
            <ul>
                {data.courses.map((course) => (
                    <li key={course.course_id}>
                        <h3>{course.name}</h3>
                        <p>난이도: {course.difficulty}</p>
                        <p>거리: {course.distance}km</p>
                        <p>소요시간: {course.duration}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MountainDetailPage;
