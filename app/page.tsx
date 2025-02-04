import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1>Miking</h1>
            <ul>
                <li>
                    <Link href="/search">🔍 산 검색하기</Link>
                </li>
                <li>
                    <Link href="/mountains">🏔️ 산 목록 보기</Link>
                </li>
            </ul>
        </div>
    );
}
