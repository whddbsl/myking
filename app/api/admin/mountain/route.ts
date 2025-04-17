import { createNewMountain } from "@/application/usecases/admin/mountain/CreateMountainUsecase";
import { deleteMountain } from "@/application/usecases/admin/mountain/DeleteMountainUsecase";
import { findAllMountains } from "@/application/usecases/admin/mountain/AdminFindMountainUsecase";
import { AdminMountainListDto } from "@/application/usecases/admin/mountain/dto/AdminMountainListDto";
import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { SbMountainRepository } from "@/infrastructure/repositories/SbMountainRepository";

import { NextResponse } from "next/server";

export async function GET() {
    const mountainRepository: MountainRepository = new SbMountainRepository();
    const mountains: AdminMountainListDto[] = await findAllMountains(
        mountainRepository
    );
    return NextResponse.json(mountains);
}

export async function DELETE(request: Request) {
    const { mountainId } = await request.json();
    const mountainRepository: MountainRepository = new SbMountainRepository();
    await deleteMountain(mountainRepository, mountainId);
    return NextResponse.json({ message: "Mountain deleted successfully" });
}

export async function POST(request: Request) {
    const { name, region, description, altitude, image_url } =
        await request.json();
    const mountainRepository: MountainRepository = new SbMountainRepository();
    await createNewMountain(mountainRepository, {
        name,
        region,
        description,
        altitude,
        image_url,
    });
    return NextResponse.json({ message: "Mountain created successfully" });
}
