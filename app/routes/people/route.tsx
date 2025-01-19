import { PlusIcon } from "lucide-react";
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
export { action } from "./action";

export default function People({ loaderData }: Route.ComponentProps) {
  const { people } = loaderData;

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
    </div>
  );
}
