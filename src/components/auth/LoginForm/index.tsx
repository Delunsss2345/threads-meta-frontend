import { FormMessageI18n } from "@/components/common/FormMessageI18n";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/features/auth/hooks";
import { useDebounceInput } from "@/hooks/use-debouce-input";
import {
  LoginSchemaBody,
  type LoginSchemaBodyType,
} from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onLogin: (values: LoginSchemaBodyType) => Promise<void>;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const { t } = useTranslation();
  const { authLoading } = useAuth();
  const form = useForm<LoginSchemaBodyType>({
    resolver: zodResolver(LoginSchemaBody),
    defaultValues: {
      login: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  useDebounceInput<LoginSchemaBodyType>({ form });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onLogin)}
        className="flex flex-col items-center space-y-3 bg-background"
        noValidate
      >
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem className="w-90">
              <Input
                disabled={authLoading}
                placeholder={t("auth.usernamePlaceholder")}
                {...field}
              />
              <FormMessageI18n />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-90">
              <Input
                disabled={authLoading}
                type="password"
                placeholder={t("auth.passwordPlaceholder")}
                {...field}
              />
              <FormMessageI18n />
            </FormItem>
          )}
        />

        <Button
          disabled={authLoading}
          type="submit"
          className="font-semibold w-90 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl"
        >
          {authLoading ? t("auth.loggingIn") : t("auth.login")}
        </Button>

        {/* Forgot password */}
        <p
          onClick={() => navigate("/forgot-password", { replace: true })}
          className="block mt-4 text-sm text-center transition-colors w-90 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          {t("auth.forgotPassword")}
        </p>

        {/* Register */}
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
