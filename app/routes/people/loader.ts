import { redirect } from "react-router";
import { authGuard } from "~/lib/auth";
import { findCurrentCompanyId } from "~/lib/auth";
import type { Route } from ".react-router/types/app/routes/people/+types";
import { prisma } from "../../../prisma/client";

export async function loader({ request }: Route.LoaderArgs) {
  await authGuard(request);
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
