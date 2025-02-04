import { deleteUser } from "@/application/usecases/admin/user/AdminDeleteUserUscases";
import { findAllUsers } from "@/application/usecases/admin/user/dto/AdminFindUserUsecase";
import { AdminUserListDto } from "@/application/usecases/admin/user/AdminUserListDto";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/SbUserRepository";
import { NextResponse } from "next/server";

export async function GET() {
    const userRepository: UserRepository = new SbUserRepository();
    const adminUserList: AdminUserListDto[] = await findAllUsers(
        userRepository
    );
    return NextResponse.json(adminUserList);
}

export async function DELETE(request: Request) {
    const { userId } = await request.json();
    const userRepository: UserRepository = new SbUserRepository();
    await deleteUser(userRepository, userId);
    return NextResponse.json({ message: "User deleted" });
}
