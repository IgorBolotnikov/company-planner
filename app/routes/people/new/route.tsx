import PersonForm from "~/routes/people/components/person-form";
import { type Route } from ".react-router/types/app/routes/people/edit/+types/route";

export { action } from "./action";

export default function NewPerson() {
  return <PersonForm />;
}
