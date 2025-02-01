import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function restoreSession(
    setUser: {
        (kakaoId: string, name: string, nickname: string): void;
    },
    resetUser: () => void
) {
    const supabase = createClientComponentClient();

    let { data, error } = await supabase.auth.getSession();

    // 세션이 없으면 localStorage에서 가져오기
    if (!data.session) {
        const savedSession = localStorage.getItem("supabase-session");
        if (savedSession) {
            data.session = JSON.parse(savedSession);
            console.log("✅ 로컬스토리지에서 세션 복원:", data.session);
        }
    }

    // 세션이 없으면 refreshSession() 시도
    if (!data.session || error) {
        console.warn("🚨 초기 세션 없음, 강제 갱신 시도...");
        ({ data, error } = await supabase.auth.refreshSession());
        if (!data.session || error) {
            console.warn("🚨 두 번째 시도 실패, 로그아웃 처리");
            resetUser();
            return null;
        }
    }

    console.log("✅  성공:", data.session);

    // ✅ 세션을 localStorage에 저장
    localStorage.setItem("supabase-session", JSON.stringify(data.session));

    return { kakaoId: data.session.user.user_metadata.provider_id };
}
