import { findMountainById } from "@/application/usecases/adminMountain/AdminFindMountainaByIdUsecase";
import { updateMountain } from "@/application/usecases/adminMountain/AdminUpdateMountainUsecase";
import { AdminMountainDto } from "@/application/usecases/adminMountain/dto/AdminMountainDto";
import { AdminMountainUpdateDto } from "@/application/usecases/adminMountain/dto/AdminMountainUpdateDto";
import { AdminMountainRepository } from "@/domain/repositories/AdminMountainRepository";
import { SbAdminMountainRepository } from "@/infrastructure/repositories/SbAdminMountainRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const mountainId = String(url.pathname.split("/").slice(-2, -1)[0]);
    const mountainRepository: AdminMountainRepository =
        new SbAdminMountainRepository();
    const mountain: AdminMountainDto = await findMountainById(
        mountainRepository,
        mountainId
    );
    return NextResponse.json(mountain);
}

export async function PUT(req: NextRequest) {
    const url = new URL(req.url);
    const mountainId = Number(url.pathname.split("/").slice(-2, -1)[0]);
    const mountainRepository: AdminMountainRepository =
        new SbAdminMountainRepository();
    const mountain: AdminMountainUpdateDto = await req.json();
    await updateMountain(mountainRepository, {
        mountain_id: mountainId,
        name: mountain.name,
        region: mountain.region,
        description: mountain.description,
    });
    return NextResponse.json({ message: "Mountain updated successfully" });
}
