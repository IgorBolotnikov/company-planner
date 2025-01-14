import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useFetcher } from "react-router";
import { z } from "zod";
import { Label } from "~/components/ui/label";
import { RemixFormProvider, useRemixForm } from "~/lib/remix-hook-form";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export const loginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const loginFormSchemaResolver = zodResolver(loginFormSchema);

type FormData = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  className?: string;
  initialValues?: z.infer<typeof loginFormSchema>;
}

export function LoginForm({
  className,
  initialValues,
}: LoginFormProps) {
  const fetcher = useFetcher();
  const form = useRemixForm<FormData>({
    mode: "onSubmit",
    fetcher,
    defaultValues: initialValues ?? { email: "", password: "" },
    resolver: loginFormSchemaResolver,
  });

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your email and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RemixFormProvider {...form}>
            <Form onSubmit={form.handleSubmit} method="POST">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    {...form.register("email")}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    type="password"
                    required
                    {...form.register("password")}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </Form>
          </RemixFormProvider>
        </CardContent>
      </Card>
    </div>
  );
}

