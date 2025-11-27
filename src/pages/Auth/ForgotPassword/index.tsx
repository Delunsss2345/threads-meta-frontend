import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import { forgotPassword } from "@/features/auth";
import type { ForgotPasswordSchemaBodyType } from "@/schema/auth.schema";
import { authApi } from "@/services/auth-api";
import type { AppDispatch } from "@/types/redux";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const ForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleForgotPassword = async (values: ForgotPasswordSchemaBodyType) => {
    try {
      const res = await authApi.validateEmail(values);
      console.log(res);
      if (!res.data.available) {
        await toast.promise(dispatch(forgotPassword(values)), {
          loading: "Đang gửi email...",
          success: "Gửi thành công! Vui lòng kiểm tra email.",
          error: "Có lỗi xảy ra, vui lòng thử lại.",
        });
      } else {
        toast.error("Email không tồn tại");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ForgotPasswordForm onForgotPassword={handleForgotPassword} />
    </>
  );
};

export default ForgotPassword;
