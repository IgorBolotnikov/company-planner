import type { LoaderFunctionArgs } from "react-router";
import { authGuard } from "@/client/lib/auth";

export async function loader({ request }: LoaderFunctionArgs) {
  await authGuard(request);
}
