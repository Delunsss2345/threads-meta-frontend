// src/components/login/LoginForm.tsx
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  LoginSchemaBody,
  type LoginSchemaBodyType,
} from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Input } from "../ui/input";
interface LoginFormProps {
  onLogin?: (username: string, password: string) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const form = useForm<LoginSchemaBodyType>({
    resolver: zodResolver(LoginSchemaBody),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginSchemaBodyType) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 flex flex-col items-center"
        noValidate
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-90">
              <Input
                placeholder="Tên người dùng, số điện thoại hoặc email"
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
              <Input type="password" placeholder="Mật khẩu" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-90 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl font-semibold"
        >
          Đăng nhập
        </Button>

        {/* Links */}
        <NavLink
          to="/forgot-password"
          className="w-90 text-sm text-muted-foreground hover:text-foreground transition-colors mt-4 block text-center"
        >
          Quên mật khẩu?
        </NavLink>

        <NavLink
          to="/register"
          className="w-90 text-sm text-muted-foreground hover:text-foreground transition-colors mt-4 block text-center"
        >
          Bạn chưa có tài khoản? Đăng ký
        </NavLink>
      </form>
    </Form>
  );
};
