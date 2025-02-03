import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function restoreSession(
    setUser: {
        (kakaoId: string, name: string, nickname: string): void;
    },
    resetUser: () => void,
    nickname: string
) {
    const supabase = createClientComponentClient();

    console.log("🔍 Supabase 쿠키 기반 세션 복원 시도...");
    let { data, error } = await supabase.auth.getSession();

    if (!data.session) {
        console.warn("🚨 세션 없음, 강제 갱신 시도...");
        ({ data, error } = await supabase.auth.refreshSession());

        if (!data.session || error) {
            console.warn("🚨 세션 갱신 실패, 로그아웃 처리");
            resetUser();
            return null;
        }
    }

    console.log("✅ 쿠키에서 세션 복원 성공:", data.session);

    setUser(
        data.session.user.user_metadata.provider_id,
        data.session.user.user_metadata?.name || "",
        nickname
    );

    return { kakaoId: data.session.user.user_metadata.provider_id };
}
