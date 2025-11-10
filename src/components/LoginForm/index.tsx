import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useDebounceInput } from "@/hook/useDebouceInput";
import {
  LoginSchemaBody,
  type LoginSchemaBodyType,
} from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Input } from "../ui/input";
interface LoginFormProps {
  onLogin: (values: LoginSchemaBodyType) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const { t } = useLanguage();
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
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-90">
              <Input
                placeholder={t("auth", "usernamePlaceholder")}
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-90">
              <Input
                type="password"
                placeholder={t("auth", "passwordPlaceholder")}
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-90 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl font-semibold"
        >
          {t("auth", "login")}
        </Button>

        {/* Links */}
        <NavLink
          to="/forgot-password"
          className="w-90 text-sm text-muted-foreground hover:text-foreground transition-colors mt-4 block text-center"
        >
          {t("auth", "forgotPassword")}
        </NavLink>

        <NavLink
          to="/register"
          className="w-90 text-sm text-muted-foreground hover:text-foreground transition-colors mt-4 block text-center"
        >
          {t("auth", "dontHaveAccount")} {t("auth", "register")}
        </NavLink>
      </form>
    </Form>
  );
};

export default LoginForm;
