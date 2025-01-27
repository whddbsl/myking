import NextAuth from "next-auth";

declare module "next-auth" {
    interface Profile {
        kakao_account: {
            id: string;
            name: string;
        };
    }

    interface Session {
        user: {
            id: string;
            accessToken: string;
            refreshToken: string;
        } & DefaultSession["user"];
    }

    interface JWT {
        id: string;
        accessToken: string;
        refreshToken: string;
    }
}
