import { FormMessageI18n } from "@/components/common/FormMessageI18n";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDebounceInput } from "@/hooks/use-debouce-input";
import {
  ForgotPasswordSchemaBody,
  type ForgotPasswordSchemaBodyType,
} from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";

interface ForgotPasswordFormProps {
  onForgotPassword: (values: ForgotPasswordSchemaBodyType) => void;
}

export const ForgotPasswordForm = ({
  onForgotPassword,
}: ForgotPasswordFormProps) => {
  const { t } = useTranslation();
  const { authLoading } = useAuth();

  const form = useForm<ForgotPasswordSchemaBodyType>({
    resolver: zodResolver(ForgotPasswordSchemaBody),
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  const navigate = useNavigate();

  useDebounceInput<ForgotPasswordSchemaBodyType>({ form });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-semibold mb-6 text-foreground">
        {t("auth.forgotPasswordTitle")}
      </h1>

      <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
        {t("auth.forgotPasswordDescription")}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onForgotPassword)}
          className="space-y-4 flex flex-col items-center w-full max-w-sm"
          noValidate
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  type="email"
                  placeholder={t("auth.emailPlaceholder")}
                  {...field}
                />
                <FormMessageI18n />
              </FormItem>
            )}
          />

          <Button
            disabled={authLoading}
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl font-semibold"
          >
            {authLoading
              ? t("auth.loadingSendResetLink")
              : t("auth.sendResetLink")}
          </Button>

          <p
            onClick={() => navigate("/login", { replace: true })}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-4 block text-center cursor-pointer"
          >
            {t("auth.backToLogin")}
          </p>
        </form>
      </Form>
    </div>
  );
};
