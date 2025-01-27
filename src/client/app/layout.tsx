import { Outlet, redirect } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getAuthUser } from "@/client/lib/auth";
import { type Route } from ".react-router/types/src/client/app/+types/layout";
import { prisma } from "@/server/adapters/db";

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

export default function Layout({ loaderData }: Route.ComponentProps) {
  const { companyName, userName } = loaderData;

  return (
    <SidebarProvider>
      <AppSidebar userName={userName} companyName={companyName} />
      <main className="relative flex min-h-svh flex-1 flex-col bg-background peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow p-4">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
