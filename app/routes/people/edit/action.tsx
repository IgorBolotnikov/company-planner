import { redirect } from "react-router";
import { findCurrentCompanyId } from "~/lib/auth";
import { getValidatedFormData } from "~/lib/remix-hook-form/utilities";
import { updatePerson } from "~/routes/people/edit/queries";
import {
  type PersonFormData,
  personFormResolver,
} from "../components/person-form";
import { type Route } from ".react-router/types/app/routes/people/edit/+types/route";

export async function action({ request, params }: Route.ActionArgs) {
  const personId = params.personId;
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
  await updatePerson({
    id: personId,
    firstName: data.firstName,
    lastName: data.lastName,
    companyId,
  });

  return redirect("/people");
}
