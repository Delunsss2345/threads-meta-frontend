import { FormMessageI18n } from "@/components/common/FormMessageI18n";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useAuth } from "@/features/auth/hooks";
import { useDebounceInput } from "@/hooks/use-debouce-input";
import {
  AuthErrorMessage,
  RegisterSchemaBody,
  type RegisterSchemaBodyType,
} from "@/schema/auth.schema";
import { authApi } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
  onRegister: (values: RegisterSchemaBodyType) => void;
}

export const RegisterForm = ({ onRegister }: RegisterFormProps) => {
  const { t } = useTranslation();
  const { authLoading } = useAuth();

  const form = useForm<RegisterSchemaBodyType>({
    resolver: zodResolver(RegisterSchemaBody),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const navigate = useNavigate();

  const handleSubmit = async (values: RegisterSchemaBodyType) => {
    const usernameRes = await authApi.validateUsername({
      username: values.username,
    });
    if (!usernameRes.data.available) {
      form.setError("username", {
        type: "manual",
        message: AuthErrorMessage.USERNAME_EXISTS,
      });
      return;
    }

    const emailRes = await authApi.validateEmail({ email: values.email });
    if (!emailRes.data.available) {
      form.setError("email", {
        type: "manual",
        message: AuthErrorMessage.EMAIL_EXISTS,
      });
      return;
    }

    await onRegister(values);
    form.reset();
  };

  useDebounceInput<RegisterSchemaBodyType>({
    form,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col items-center space-y-3"
        noValidate
      >
        <FormField
          control={form.control}
          name="username"
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
          name="email"
          render={({ field }) => (
            <FormItem className="w-90">
              <Input
                disabled={authLoading}
                type="email"
                placeholder={t("auth.emailPlaceholder")}
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

        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem className="w-90">
              <Input
                disabled={authLoading}
                type="password"
                placeholder={t("auth.confirmPasswordPlaceholder")}
                {...field}
              />
              <FormMessageI18n />
            </FormItem>
          )}
        />

        {/* Submit button */}
        <Button
          disabled={authLoading}
          type="submit"
          className="font-semibold w-90 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl"
        >
          {authLoading ? <Spinner /> : t("auth.register")}
        </Button>

        {/* Link */}
        <p
          onClick={() => navigate("/login", { replace: true })}
          className="block mt-4 text-sm text-center transition-colors w-90 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          {t("auth.alreadyHaveAccount")}
        </p>
      </form>
    </Form>
  );
};
