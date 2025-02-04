import { findMountainName } from "@/application/usecases/admin/mountain/AdminFindMountainNameUsecase";
import { AdminMountainNameDto } from "@/application/usecases/admin/mountain/dto/AdminMountainNameDto";
import { MountainRepository } from "@/domain/repositories/MountainRepository";
import { SbMountainRepository } from "@/infrastructure/repositories/SbMountainRepository";
import { NextResponse } from "next/server";

export async function GET() {
    const mountainRepository: MountainRepository = new SbMountainRepository();
    const mountainNames: AdminMountainNameDto[] = await findMountainName(
        mountainRepository
    );
    return NextResponse.json(mountainNames);
}
