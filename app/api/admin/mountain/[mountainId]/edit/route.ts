import { MountainUpdateDto } from "@/application/usecases/admin/mountain/dto/MountainUpdateDto";
import { updateMountain } from "@/application/usecases/admin/mountain/UpdateMountainUsecase";
import { findMountainById } from "@/application/usecases/admin/mountain/AdminFindMountainaByIdUsecase";
import { AdminMountainDto } from "@/application/usecases/admin/mountain/dto/AdminMountainDto";
import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { SbMountainRepository } from "@/infrastructure/repositories/SbMountainRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const mountainId = String(url.pathname.split("/").slice(-2, -1)[0]);
    const mountainRepository: MountainRepository = new SbMountainRepository();
    const mountain: AdminMountainDto = await findMountainById(
        mountainRepository,
        mountainId
    );
    return NextResponse.json(mountain);
}

export async function PUT(req: NextRequest) {
    const url = new URL(req.url);
    const mountainId = Number(url.pathname.split("/").slice(-2, -1)[0]);
    const mountainRepository: MountainRepository = new SbMountainRepository();
    const mountain: MountainUpdateDto = await req.json();
    await updateMountain(mountainRepository, {
        mountain_id: mountainId,
        name: mountain.name,
        region: mountain.region,
        description: mountain.description,
        altitude: mountain.altitude,
        image_url: mountain.image_url,
    });
    return NextResponse.json({ message: "Mountain updated successfully" });
}
