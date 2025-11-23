import z from "zod";

const LoginSchemaBody = z.object({
  login: z
    .string({ message: "Tên đăng nhập không hợp lệ" })
    .min(6, { message: "Tên đăng nhập không hợp lệ" }),
  password: z
    .string({ message: "Mật khẩu không hợp lệ" })
    .min(8, { message: "Mật khẩu tối thiểu 8 ký tự" }),
});

const RegisterSchemaBody = z
  .object({
    username: z
      .string({ message: "Tên đăng nhập không hợp lệ" })
      .min(6, { message: "Tên đăng nhập không hợp lệ" }),
    email: z.string({ message: "Email không hợp lệ" }).email(),
    password: z
      .string({ message: "Mật khẩu không hợp lệ" })
      .min(8, { message: "Mật khẩu tối thiểu 8 ký tự" }),
    password_confirmation: z.string().min(8),
  })
  .superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["password_confirmation"],
      });
    }
  });

const ForgotPasswordSchemaBody = z.object({
  email: z
    .string({ message: "Email không hợp lệ" })
    .email({ message: "Email không hợp lệ" }),
});

const ResetPasswordSchemaBody = z.object({
  token: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  password_confirmation: z.string().min(6),
});

type LoginSchemaBodyType = z.infer<typeof LoginSchemaBody>;
type RegisterSchemaBodyType = z.infer<typeof RegisterSchemaBody>;
type ForgotPasswordSchemaBodyType = z.infer<typeof ForgotPasswordSchemaBody>;
type ResetPasswordSchemaBodyType = z.infer<typeof ResetPasswordSchemaBody>;

export {
  ForgotPasswordSchemaBody,
  LoginSchemaBody,
  RegisterSchemaBody,
  ResetPasswordSchemaBody,
};
export type {
  ForgotPasswordSchemaBodyType,
  LoginSchemaBodyType,
  RegisterSchemaBodyType,
  ResetPasswordSchemaBodyType,
};
