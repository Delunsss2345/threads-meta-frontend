import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDebounceInput } from "@/hook/useDebouceInput";
import {
  RegisterSchemaBody,
  type RegisterSchemaBodyType,
} from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

interface RegisterFormProps {
  onRegister: (values: RegisterSchemaBodyType) => void;
}

export const RegisterForm = ({ onRegister }: RegisterFormProps) => {
  const { t } = useTranslation();
  const form = useForm<RegisterSchemaBodyType>({
    resolver: zodResolver(RegisterSchemaBody),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useDebounceInput<RegisterSchemaBodyType>({ form });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onRegister)}
        className="space-y-3 flex flex-col items-center"
        noValidate
      >
        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-90">
              <Input placeholder={t("auth.usernamePlaceholder")} {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-90">
              <Input
                placeholder={t("auth.emailPlaceholder")}
                type="email"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-90">
              <Input
                type="password"
                placeholder={t("auth.passwordPlaceholder")}
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-90">
              <Input
                type="password"
                placeholder={t("auth.confirmPasswordPlaceholder")}
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit button */}
        <Button
          type="submit"
          className="w-90 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl font-semibold"
        >
          {t("auth.register")}
        </Button>

        {/* Link */}
        <NavLink
          to="/login"
          className="w-90 text-sm text-muted-foreground hover:text-foreground transition-colors mt-4 block text-center"
        >
          {t("auth.alreadyHaveAccount")}
        </NavLink>
      </form>
    </Form>
  );
};
