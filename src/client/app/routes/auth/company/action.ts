import { redirect } from "react-router";
import { getAuthUser } from "@/client/lib/auth";
import { getValidatedFormData } from "@/client/lib/remix-hook-form/utilities";
import { updateCompanyName } from "~/routes/auth/company/queries";
import {
  type CreateCompanyFormData,
  createCompanyResolver,
} from "~/routes/auth/company/components/create-company-form";
import type { Route } from "../../../../.react-router/types/src/client/app/routes/auth/company/+types/route";

export async function action({ request }: Route.ActionArgs) {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<CreateCompanyFormData>(
    request,
    createCompanyResolver
  );

  if (errors) {
    return { errors, defaultValues };
  }

  const user = await getAuthUser(request);
  if (!user) {
    throw redirect("/kinde-auth/login");
  }

  await updateCompanyName(user.email, data.name);
  return redirect("/");
}
