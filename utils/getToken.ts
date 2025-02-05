export const getToken = (): string | null => {
    const storedSession = localStorage.getItem("supabase-session");
    if (!storedSession) {
        console.error("세션 없음");
        return null;
    }
    const session = JSON.parse(storedSession);
    return session.access_token;
};
