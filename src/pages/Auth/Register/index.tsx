import { RegisterForm } from "@/components/RegisterForm";
import { register, resendVerifyEmail } from "@/features/auth";
import type { RegisterSchemaBodyType } from "@/schema/auth.schema";
import type { AppDispatch } from "@/types/redux";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleRegister = async (values: RegisterSchemaBodyType) => {
    try {
      const res = await dispatch<any>(register(values));
      await toast.promise(
        dispatch(resendVerifyEmail({ token: res.payload.data.access_token })),
        {
          success: "Chúng tôi đã gửi liên kết xác minh email",
          loading: "Đang xử lý...",
          error: "Có lỗi xảy ra, vui lòng thử lại",
        }
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <RegisterForm onRegister={handleRegister} />
    </>
  );
};

export default Register;
