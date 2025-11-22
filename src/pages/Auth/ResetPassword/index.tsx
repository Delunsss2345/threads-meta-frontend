import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import { useAuth } from "@/features/auth/hook";
import type { ResetPasswordSchemaBodyType } from "@/schema/auth.schema";
import type { AppDispatch } from "@/types/redux";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Register = () => {
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  if (isAuthenticated || !token) {
    window.location.replace("/");
    return null;
  }
  const dispatch = useDispatch<AppDispatch>();
  const handleRestPassword = async (values: ResetPasswordSchemaBodyType) => {
    try {
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <ResetPasswordForm token={token} onResetPassword={handleRestPassword} />
    </>
  );
};

export default Register;
