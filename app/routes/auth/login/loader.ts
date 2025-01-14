import { getFormDataFromSearchParams } from "~/lib/remix-hook-form/utilities";
import { type Route } from ".react-router/types/app/routes/auth/login/+types/route";

export function loader({ request }: Route.LoaderArgs) {
  const data = getFormDataFromSearchParams(request);
  return { result: "success" };
}
