import { createNewMountain } from "@/application/usecases/admin/mountain/CreateMountainUsecase";
import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { SbMountainRepository } from "@/infrastructure/repositories/SbMountainRepository";
import { NextResponse } from "next/server";

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
