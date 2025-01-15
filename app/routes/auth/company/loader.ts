import type { LoaderFunctionArgs } from "react-router";
import { authGuard } from "~/lib/auth";

export async function loader({ request }: LoaderFunctionArgs) {
  await authGuard(request);
}
