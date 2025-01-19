import { redirect } from "react-router";
import { findCurrentCompanyId } from "~/lib/auth";
import { getValidatedFormData } from "~/lib/remix-hook-form/utilities";
import { updatePerson } from "~/routes/people/edit/queries";
import {
  type PersonFormData,
  personFormResolver,
} from "../components/person-form";
import { type Route } from ".react-router/types/app/routes/people/edit/+types/route";
import { createPerson } from "./queries";

export async function action({ request }: Route.ActionArgs) {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<PersonFormData>(request, personFormResolver);

  if (errors) {
    return { errors, defaultValues };
  }

  const companyId = await findCurrentCompanyId(request);
  if (!companyId) {
    return {};
  }
  await createPerson({
    firstName: data.firstName,
    lastName: data.lastName,
    companyId,
  });

  return redirect("/people");
}
