import { redirect } from "react-router";
import { findCurrentCompanyId } from "~/lib/auth";
import { prisma } from "@/prisma/client";
import { type Route } from ".react-router/types/app/routes/people/+types/route";

export async function loader({ request }: Route.LoaderArgs) {
  const companyId = await findCurrentCompanyId(request);

  if (!companyId) {
    throw redirect("/kinde-auth/login");
  }

  const people = await prisma.employee.findMany({
    where: {
      companyId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      position: {
        select: {
          name: true,
        }
      },
    },
  });

  return { people };
}
