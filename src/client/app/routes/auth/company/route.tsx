import { CreateCompanyForm } from "./components/create-company-form";
export { action } from "./action";
export { loader } from "./loader";

export default function Company() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <CreateCompanyForm />
      </div>
    </div>
  );
}
