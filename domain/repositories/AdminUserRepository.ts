import { AdminUser } from "../entities/AdminUser";

export interface AdminUserRepository {
    getUsers(): Promise<AdminUser[]>;
    deleteUser(userId: string): Promise<void>;
}
