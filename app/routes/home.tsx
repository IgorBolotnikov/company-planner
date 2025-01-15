import React from "react";
import { Link, redirect } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getAuthUser } from "~/lib/auth";
import { checkIfUserExists, createUserAndCompany } from "~/routes/auth";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Company Planner" },
    { name: "description", content: "An easy way to plan your teams in a company!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getAuthUser(request);
  if (!!user && !(await checkIfUserExists(user.email))) {
    await createUserAndCompany({
      email: user.email,
      firstName: user.given_name ?? "",
      lastName: user.family_name ?? "",
    });
    throw redirect("/kinde-auth/company");
  }
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Company Planner</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Link to="/kinde-auth/login">
            <Button variant="default" className="w-full">
              Login
            </Button>
          </Link>

          <Link to="/kinde-auth/register">
            <Button variant="default" className="w-full">
              Register
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
