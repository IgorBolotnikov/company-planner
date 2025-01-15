import { getKindeSession } from "@kinde-oss/kinde-remix-sdk";
import { redirect } from "react-router";

export async function authGuard(request: Request) {
  const { getUser } = await getKindeSession(request);
  const user = await getUser();

  if (user === null) {
    throw redirect("/kinde-auth/login");
  }

  return;
}

export async function getAuthUser(request: Request) {
  const { getUser } = await getKindeSession(request);
  return await getUser();
}
