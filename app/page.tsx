"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header>miking</header>
      <main>
      
        <ul>
          <li>
            <Link href="/admin/user">관리자 페이지</Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
