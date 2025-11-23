import { selectAuthLoadingRequest } from "@/features/auth";
import { useDebounceInput } from "@/hooks/use-debouce-input";
import {
  ResetPasswordSchemaBody,
  type ResetPasswordSchemaBodyType,
} from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface ResetPasswordFormProps {
  onResetPassword: (values: ResetPasswordSchemaBodyType) => void;
  token: string; // reset token gửi từ URL
}

export const ResetPasswordForm = ({
  onResetPassword,
  token,
}: ResetPasswordFormProps) => {
  const { t } = useTranslation();
  const form = useForm<ResetPasswordSchemaBodyType>({
    resolver: zodResolver(ResetPasswordSchemaBody),
    mode: "onSubmit",
    defaultValues: {
      token,
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const loadingRequest = useSelector(selectAuthLoadingRequest);
  const navigate = useNavigate();

  useDebounceInput<ResetPasswordSchemaBodyType>({ form });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-semibold mb-6 text-foreground">
        {t("auth.resetPasswordTitle")}
      </h1>

      <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
        {t("auth.resetPasswordDescription")}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onResetPassword)}
          className="space-y-4 flex flex-col items-center w-full max-w-sm"
          noValidate
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input type="email" placeholder={t("auth.email")} {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  type="password"
                  placeholder={t("auth.newPassword")}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  type="password"
                  placeholder={t("auth.confirmPassword")}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loadingRequest}
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl font-semibold"
          >
            {!loadingRequest ? t("auth.resetPassword") : t("auth.loading")}
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
