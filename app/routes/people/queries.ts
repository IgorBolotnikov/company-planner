import { prisma } from "@/prisma/client";

export async function createPerson(args: {
  firstName: string,
  lastName: string,
  position: string,
  team: string,
  internalRate: string,
  hasExternalRate: boolean,
  externalRate: string
}) {
  return prisma.employee.create({
    data: {
      firstName: args.firstName,
      lastName: args.lastName,
      // Need to think about how to handle positions separately
      position: args.position,
      team: args.team,
      internalRate: args.internalRate,
      hasExternalRate: args.hasExternalRate,
      externalRate: args.externalRate,
    },
  });
}

export async function updatePerson(args: {
  id: string,
  firstName: string,
  lastName: string,
  position: string,
  team: string,
  internalRate: string,
  hasExternalRate: boolean,
  externalRate: string
}) {

}
