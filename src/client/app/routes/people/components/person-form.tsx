import { zodResolver } from "@hookform/resolvers/zod";
import { useFetcher, useNavigate } from "react-router";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RemixFormProvider, useRemixForm } from "@/client/lib/remix-hook-form";

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  position: z.string(),
  team: z.string(),
  // internalRate: z.string(),
  // hasExternalRate: z.boolean(),
  // externalRate: z.optional(z.string()),
});

export const personFormResolver = zodResolver(schema);

export type PersonFormData = z.infer<typeof schema>;

interface PersonFormProps extends React.PropsWithChildren {
  initialValues?: PersonFormData;
}

export default function PersonForm({ initialValues }: PersonFormProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const form = useRemixForm<PersonFormData>({
    mode: "onSubmit",
    fetcher,
    defaultValues: initialValues ?? {
      firstName: "",
      lastName: "",
      position: "",
      team: "",
    },
    resolver: personFormResolver,
  });

  const headerText = initialValues ? "Edit Person" : "New Person";

  const buttonText = initialValues ? "Update" : "Create";

  return (
    <Dialog open onOpenChange={() => navigate(-1)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{headerText}</DialogTitle>
        </DialogHeader>
        <RemixFormProvider {...form}>
          <form onSubmit={form.handleSubmit} method="POST">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input {...form.register("firstName")} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input {...form.register("lastName")} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="position">Position</Label>
                <Input {...form.register("position")} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="position">Team (optional)</Label>
                <Input {...form.register("team")} />
              </div>
              <DialogFooter>
                <Button type="submit">{buttonText}</Button>
              </DialogFooter>
            </div>
          </form>
        </RemixFormProvider>
      </DialogContent>
    </Dialog>
  );
}
