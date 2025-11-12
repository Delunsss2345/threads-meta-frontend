import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useDebounceInput } from "@/hook/useDebouceInput";
import {
  LoginSchemaBody,
  type LoginSchemaBodyType,
} from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { Input } from "../ui/input";

interface LoginFormProps {
  onLogin: (values: LoginSchemaBodyType) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const { t } = useTranslation();
  const form = useForm<LoginSchemaBodyType>({
    resolver: zodResolver(LoginSchemaBody),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useDebounceInput<LoginSchemaBodyType>({ form });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onLogin)}
        className="space-y-3 flex flex-col items-center"
        noValidate
      >
        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-[22.5rem]">
              <Input placeholder={t("auth.usernamePlaceholder")} {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-[22.5rem]">
              <Input
                type="password"
                placeholder={t("auth.passwordPlaceholder")}
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          type="submit"
          className="w-[22.5rem] bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl font-semibold"
        >
          {t("auth.login")}
        </Button>

        {/* Links */}
        <NavLink
          to="/forgot-password"
          className="w-[22.5rem] text-sm text-muted-foreground hover:text-foreground transition-colors mt-4 block text-center"
        >
          {t("auth.forgotPassword")}
        </NavLink>

        <NavLink
          to="/register"
          className="w-[22.5rem] text-sm text-muted-foreground hover:text-foreground transition-colors mt-2 block text-center"
        >
          {t("auth.dontHaveAccount")} {t("auth.register")}
        </NavLink>
      </form>
    </Form>
  );
};

export default LoginForm;
