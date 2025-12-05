import { FormMessageI18n } from "@/components/common/FormMessageI18n";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { selectAuthLoggingIn } from "@/features/auth";
import { useDebounceInput } from "@/hooks/use-debouce-input";
import {
  RegisterSchemaBody,
  type RegisterSchemaBodyType,
} from "@/schema/auth.schema";
import { useAppSelector } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
  onRegister: (values: RegisterSchemaBodyType) => void;
}

export const RegisterForm = ({ onRegister }: RegisterFormProps) => {
  const { t } = useTranslation();
  const loggingIn = useAppSelector(selectAuthLoggingIn);
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
    await onRegister(values);
    form.reset();
  };
  useDebounceInput<RegisterSchemaBodyType>({ form });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col items-center space-y-3"
        noValidate
      >
        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-90">
              <Input placeholder={t("auth.usernamePlaceholder")} {...field} />
              <FormMessageI18n />
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
              <FormMessageI18n />
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
              <FormMessageI18n />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem className="w-90">
              <Input
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
          disabled={!loggingIn}
          type="submit"
          className="font-semibold w-90 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl"
        >
          {!loggingIn ? <Spinner /> : t("auth.register")}
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
