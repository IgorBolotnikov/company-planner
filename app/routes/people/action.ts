import type { ActionFunctionArgs } from "react-router";
import { findCurrentCompanyId } from "~/lib/auth";
import { getValidatedFormData } from "~/lib/remix-hook-form/utilities";
import { resolver } from "~/routes/people/components/person-form";

export async function action({
  request,
}: ActionFunctionArgs) {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<FormData>(request, resolver);

  if (errors) {
    return { errors, defaultValues };
  }

  const companyId = await findCurrentCompanyId(request);
  if (!companyId) {
    return {};
  }

  return data;
}
