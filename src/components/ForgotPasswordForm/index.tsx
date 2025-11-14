import { useDebounceInput } from "@/hooks/useDebouceInput";
import {
  ForgotPasswordSchemaBody,
  type ForgotPasswordSchemaBodyType,
} from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface ForgotPasswordFormProps {
  onForgotPassword: (values: ForgotPasswordSchemaBodyType) => void;
}

export const ForgotPasswordForm = ({
  onForgotPassword,
}: ForgotPasswordFormProps) => {
  const { t } = useTranslation();
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
        Quên mật khẩu
      </h1>

      <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
        Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
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
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl font-semibold"
          >
            {t("auth.sendResetLink")}
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
