import { prisma } from "@/server/adapters/db";
import { redirect } from "react-router";
import { findCurrentCompanyId } from "@/client/lib/auth";
import { type Route } from ".react-router/types/src/client/app/routes/people/delete/+types/route";

export async function action({ request, params }: Route.ActionArgs) {
  const personId = params.personId;
  const companyId = await findCurrentCompanyId(request);
  if (!companyId) {
    return {};
  }
  await prisma.employee.delete({
    where: {
      id: personId,
      companyId: companyId,
    },
  });
  return redirect("/people");
}
