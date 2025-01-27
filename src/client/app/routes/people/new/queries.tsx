import { prisma } from "@/server/adapters/db";

export async function createPerson(args: {
  firstName: string,
  lastName: string,
  companyId: string,
}) {
  return prisma.employee.create({
    data: {
      firstName: args.firstName,
      lastName: args.lastName,
      company: {
        connect: {
          id: args.companyId,
        },
      }
    },
  });
}
