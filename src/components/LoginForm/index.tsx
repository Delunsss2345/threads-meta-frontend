import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useDebounceInput } from "@/hooks/use-debouce-input";
import {
  LoginSchemaBody,
  type LoginSchemaBodyType,
} from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useDebounceInput<LoginSchemaBodyType>({ form });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onLogin)}
        className="flex flex-col items-center space-y-3"
        noValidate
      >
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

        <Button
          type="submit"
          className="font-semibold w-90 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl"
        >
          {t("auth.login")}
        </Button>

        {/* Links */}
        <p
          onClick={() => navigate("/forgot-password", { replace: true })}
          className="block mt-4 text-sm text-center transition-colors w-90 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          {t("auth.forgotPassword")}
        </p>

        <p
          onClick={() => navigate("/register", { replace: true })}
          className="block mt-4 text-sm text-center transition-colors w-90 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          {t("auth.dontHaveAccount")} {t("auth.register")}
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
