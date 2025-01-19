import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Form, Link, Outlet } from "react-router";
import {
  ConfirmationDialog,
} from "~/components/confirmation-dialog";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { type Route } from ".react-router/types/app/routes/people/+types/route";

export { loader } from "./loader";

export default function People({ loaderData }: Route.ComponentProps) {
  const { people } = loaderData;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">People</h1>
      <div className="flex flex-row gap-4 justify-end">
        <Link to="/people/new">
          <Button variant="default">
            <PlusIcon />
            Add Person
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Number</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map((person, index) => (
            <TableRow key={person.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{person.firstName}</TableCell>
              <TableCell>{person.lastName}</TableCell>
              <TableCell>{person.position?.name ?? ""}</TableCell>
              <TableCell>{""}</TableCell>
              <TableCell className="inline-flex flex-row gap-2">
                <Link to={`/people/${person.id}/edit`}>
                  <Button variant="link">
                    <PencilIcon /> Edit
                  </Button>
                </Link>
                <ConfirmationDialog
                  description={`Are you sure you want to delete ${person.firstName} ${person.lastName}? This action cannot be undone.`}
                  trigger={
                    <Button variant="link" type="button" className="text-destructive">
                      <TrashIcon /> Delete
                    </Button>
                  }
                  confirm={
                    <Form className="" action={`/people/${person.id}/delete`} method="POST">
                      <Button type="submit">
                        Delete
                      </Button>
                    </Form>
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Outlet />
    </div>
  );
}
