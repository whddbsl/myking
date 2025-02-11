import { User } from "../entities/User";

export interface UserRepository {
    create(user: User): Promise<void>;
    findByNickname(nickname: string): Promise<boolean>;
    findById(kakaoId: string): Promise<User | null>;
    getUsers(): Promise<User[]>;
    deleteUser(userId: string): Promise<void>;
    updateNickname(kakaoId: string, newNickname: string): Promise<User | null>;
    getUserByUuid(userId: string): Promise<User>;
    updateNickname(kakaoId: string, newNickname: string): Promise<User>;
    updateNicknameAndProfileImage(
        kakaoId: string,
        newNickname: string,
        profileImage: string
    ): Promise<User>;
    updateProfileImage(kakaoId: string, profileImage: string): Promise<User>;
}
