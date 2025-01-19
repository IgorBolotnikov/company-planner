import { handleAuth } from "@kinde-oss/kinde-remix-sdk";
import { type LoaderFunctionArgs, redirect } from "react-router";
import { prisma } from "@/prisma/client";

export async function loader({ params, request }: LoaderFunctionArgs) {
  if (params["*"] === "company") {
    throw redirect("/kinde-auth/company");
  }
  return await handleAuth(request, params["*"]);
}

export async function createUserAndCompany({
  email,
  firstName,
  lastName,
}: {
  email: string;
  firstName: string;
  lastName: string;
}) {
  const company = await prisma.company.create({
    data: {
      name: "",
    },
  });
  return prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      company: {
        connect: {
          id: company.id,
        },
      },
    },
  });
}

export async function checkIfUserExists(email: string) {
  return !!(await prisma.user.findFirst({
    where: {
      email,
    },
  }));
}
