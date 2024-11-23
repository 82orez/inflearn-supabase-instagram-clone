"use server";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const peopleList = await prisma.userinfo.findMany({});
  return NextResponse.json(peopleList);
}
