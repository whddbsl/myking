import { deleteUser } from "@/application/usecases/adminUser/AdminDeleteUserUscases";
import { findAllUsers } from "@/application/usecases/adminUser/DfAdminFindUserUsecase";
import { AdminUserDto } from "@/application/usecases/adminUser/dto/AdminUserDto";
import { AdminUserRepository } from "@/domain/repositories/AdminUserRepository";
import { SbAdminUserRepository } from "@/infrastructure/repositories/SbAdminUserRepository";
import { NextResponse } from "next/server";

export async function GET() {
    const userRepository: AdminUserRepository = new SbAdminUserRepository();
    const adminUserList: AdminUserDto[] = await findAllUsers(userRepository);
    return NextResponse.json(adminUserList);
}

export async function DELETE(request: Request) {
    const { userId } = await request.json();
    const userRepository: AdminUserRepository = new SbAdminUserRepository();
    await deleteUser(userRepository, userId);
    return NextResponse.json({ message: "User deleted" });
}