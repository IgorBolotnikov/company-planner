import { prisma } from "@/server/adapters/db";

export async function updateCompanyName(userEmail: string, name: string) {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: userEmail,
    },
  });
  await prisma.company.update({
    where: {
      id: user.companyId,
    },
    data: {
      name,
    },
  });
}
