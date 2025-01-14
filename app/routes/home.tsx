import React from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Company Planner" },
    { name: "description", content: "An easy way to plan your teams in a company!" },
  ];
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
