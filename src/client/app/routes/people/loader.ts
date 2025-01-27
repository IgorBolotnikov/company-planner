import { prisma } from "@/server/adapters/db";
import { redirect } from "react-router";
import { findCurrentCompanyId } from "@/client/lib/auth";
import { type Route } from ".react-router/types/src/client/app/routes/people/+types/route";

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
