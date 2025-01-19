import { prisma } from "@/prisma/client";
import { getKindeSession } from "@kinde-oss/kinde-remix-sdk";
import { redirect } from "react-router";

export async function authGuard(request: Request) {
  const { getUser } = await getKindeSession(request);
  const user = await getUser();

  if (user === null) {
    throw redirect("/kinde-auth/login");
  }

  return user;
}

export async function getAuthUser(request: Request) {
  const { getUser } = await getKindeSession(request);
  return await getUser();
}

export async function findCurrentCompanyId(request: Request) {
  const user = await getAuthUser(request);
  if (!user) {
    return null;
  }
  const userWithCompany = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
    select: {
      companyId: true,
    },
  });
  return userWithCompany?.companyId ?? null;
}
