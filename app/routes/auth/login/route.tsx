import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginForm } from "~/components/form/login-form";

export { action } from "./action";
export { loader } from "./loader";

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

export default function Login() {
  const loginValues = {
    email: "",
    password: "",
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm initialValues={loginValues} />
      </div>
    </div>
  );
}
