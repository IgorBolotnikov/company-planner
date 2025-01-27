import PersonForm from "~/routes/people/components/person-form";
import { type Route } from ".react-router/types/src/client/app/routes/people/edit/+types/route";

export { loader } from "./loader";
export { action } from "./action";

export default function EditPerson({ loaderData }: Route.ComponentProps) {
  const { person } = loaderData;

  return <PersonForm initialValues={person} />;
}
