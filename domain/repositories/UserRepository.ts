import { User } from "../entities/User";

export interface UserRepository {
    create(user: User): Promise<void>;
    findByNickname(nickname: string): Promise<boolean>;
    findById(kakaoId: string): Promise<User | null>;
    getUsers(): Promise<User[]>;
    deleteUser(userId: string): Promise<void>;
    getUserByUuid(userId: string): Promise<User>;
    updateNickname(user: User, newNickname: string): Promise<User | null>;
    updateNicknameAndProfileImage(
        user: User,
        newNickname: string
    ): Promise<User>;
    updateProfileImage(user: User): Promise<User>;
}
