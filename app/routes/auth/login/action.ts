import { loginFormSchemaResolver } from "~/components/form/login-form";
import { getValidatedFormData } from "~/lib/remix-hook-form/utilities";
import { type Route } from ".react-router/types/app/routes/auth/login/+types/route";

export async function action({ request }: Route.ActionArgs) {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<FormData>(request, loginFormSchemaResolver);

  if (errors) {
    return { errors, defaultValues };
  }

  return data;
}
