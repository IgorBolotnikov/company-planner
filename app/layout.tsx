import { redirect, useLoaderData } from "react-router";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { getAuthUser } from "~/lib/auth";
import { type Route } from "../.react-router/types/app/+types/root";
import { prisma } from "../prisma/client";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getAuthUser(request);
  if (!user) {
    throw redirect("/kinde-auth/login");
  }
  const userWithCompany = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
    select: {
      firstName: true,
      company: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    companyName: userWithCompany?.company.name ?? "",
    userName: userWithCompany?.firstName ?? "",
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { companyName, userName } = useLoaderData<typeof loader>();

  return (
    <SidebarProvider>
      <AppSidebar
        userName={userName}
        companyName={companyName}
      />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
