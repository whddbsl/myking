import Link from "next/link";

import ProtectedRoute from "@/components/user/ProtectedRoutes";

export default function Home() {
    return (
        <ProtectedRoute>
            <div>
                <h1>Miking</h1>
                <li>
                    <Link href="/search">🔍 산 검색하기</Link>
                </li>
            </div>
        </ProtectedRoute>
    );
}
