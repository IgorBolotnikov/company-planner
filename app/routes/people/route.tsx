import { PlusIcon } from "lucide-react";
import { Outlet, useLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { loader } from "./loader";
export { loader } from "./loader";

export default function People() {
  const { people } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">People</h1>
      <div className="flex flex-row gap-4 justify-end">
        <Button variant="default">
          <PlusIcon />
          Add Person
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Number</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Team</TableHead>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Outlet />
    </div>
  );
}
