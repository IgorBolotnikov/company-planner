import { prisma } from "@/prisma/client";
import { redirect } from "react-router";
import { type Route } from ".react-router/types/app/routes/people/edit/+types/route";

export async function loader({ params }: Route.LoaderArgs) {
  const personId = params.personId;
  const person = await prisma.employee.findUnique({
    where: {
      id: personId,
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
  if (!person) {
    throw redirect("/people");
  }
  return {
    person: {
      id: person.id,
      firstName: person.firstName,
      lastName: person.lastName,
      position: person.position?.name ?? "",
      team: "",

    }
  }
}
