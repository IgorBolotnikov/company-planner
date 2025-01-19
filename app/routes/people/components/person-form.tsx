import { zodResolver } from "@hookform/resolvers/zod";
import {
  useFetcher,
} from "react-router";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RemixFormProvider, useRemixForm } from "~/lib/remix-hook-form";

export const schema = z.object({
  id: z.optional(z.string()),
  firstName: z.string(),
  lastName: z.string(),
  position: z.string(),
  team: z.string(),
  internalRate: z.string(),
  hasExternalRate: z.boolean(),
  externalRate: z.optional(z.string()),
});

export const resolver = zodResolver(schema);

type FormData = z.infer<typeof schema>;

interface PersonFormProps extends React.PropsWithChildren {
  initialValues?: FormData;
}

export default function PersonForm({
  initialValues,
  children,
}: PersonFormProps) {
  const fetcher = useFetcher();
  const form = useRemixForm<FormData>({
    mode: "onSubmit",
    fetcher,
    defaultValues: initialValues ?? {
      firstName: "",
      lastName: "",
      position: "",
      team: "",
    },
    resolver,
  });

  const headerText = initialValues
    ? "Edit Person"
    : "New Person";

  const buttonText = initialValues
    ? "Update"
    : "Create";

  return (
    <Dialog>
      {children}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{headerText}</DialogTitle>
        </DialogHeader>
        <RemixFormProvider {...form}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">
                First Name
              </Label>
              <Input {...form.register("firstName")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">
                Last Name
              </Label>
              <Input {...form.register("lastName")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="position">
                Position
              </Label>
              <Input {...form.register("position")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="position">
                Team (optional)
              </Label>
              <Input {...form.register("team")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="position">
                Team (optional)
              </Label>
              <Input {...form.register("team")} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{buttonText}</Button>
          </DialogFooter>
        </RemixFormProvider>
      </DialogContent>
    </Dialog>
  );
}
