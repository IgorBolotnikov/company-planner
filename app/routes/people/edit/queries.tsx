import { prisma } from "@/prisma/client";

export async function updatePerson(args: {
  id: string,
  firstName: string,
  lastName: string,
  companyId: string,
}) {
  return prisma.employee.update({
    where: {
      id: args.id,
      companyId: args.companyId,
    },
    data: {
      firstName: args.firstName,
      lastName: args.lastName,
    },
  });
}
