import { User } from "../entities/User";

export interface UserRepository {
    create(user: User): Promise<void>;
    findByNickname(nickname: string): Promise<User | null>;
    findById(kakaoId: string): Promise<User | null>;
    updateNickname(kakaoId: string, newNickname: string): Promise<User | null>;
}
