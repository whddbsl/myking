import { AdminMountainRepository } from "@/domain/repositories/AdminMountainRepository";
import { SbAdminMountainRepository } from "@/infrastructure/repositories/SbAdminMountainRepository";
import { findAllMountains } from "@/application/usecases/adminMountain/DfAdminFindMountainUsecase";
import { AdminMountainListDto } from "@/application/usecases/adminMountain/dto/AdminMountainListDto";
import { NextResponse } from "next/server";
import { deleteMountain } from "@/application/usecases/adminMountain/AdminDeleteMountainUsecase";
import { createNewMountain } from "@/application/usecases/adminMountain/AdminCreateMountainUsecase";

export async function GET() {
    const mountainRepository: AdminMountainRepository =
        new SbAdminMountainRepository();
    const mountains: AdminMountainListDto[] = await findAllMountains(
        mountainRepository
    );
    return NextResponse.json(mountains);
}

export async function DELETE(request: Request) {
    const { mountainId } = await request.json();
    const mountainRepository: AdminMountainRepository =
        new SbAdminMountainRepository();
    await deleteMountain(mountainRepository, mountainId);
    return NextResponse.json({ message: "Mountain deleted successfully" });
}

export async function POST(request: Request) {
    const { name, region, description } = await request.json();
    const mountainRepository: AdminMountainRepository =
        new SbAdminMountainRepository();
    await createNewMountain(mountainRepository, {
        name,
        region,
        description,
    });
    return NextResponse.json({ message: "Mountain created successfully" });
}
