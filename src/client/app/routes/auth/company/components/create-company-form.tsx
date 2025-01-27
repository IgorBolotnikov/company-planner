import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "react-router";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RemixFormProvider, useRemixForm } from "@/client/lib/remix-hook-form";

const schema = z.object({
  name: z.string(),
});

export const createCompanyResolver = zodResolver(schema);

export type CreateCompanyFormData = z.infer<typeof schema>;

export function CreateCompanyForm() {
  const form = useRemixForm<CreateCompanyFormData>({
    mode: "onSubmit",
    defaultValues: { name: "" },
    resolver: createCompanyResolver,
  });

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">You're almost done!</CardTitle>
          <CardDescription>
            Give a name to your company.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RemixFormProvider {...form}>
            <Form onSubmit={form.handleSubmit} method="POST">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Company Name</Label>
                  <Input
                    id="name"
                    placeholder="My Company"
                    required
                    {...form.register("name")}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Create
                </Button>
              </div>
            </Form>
          </RemixFormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
