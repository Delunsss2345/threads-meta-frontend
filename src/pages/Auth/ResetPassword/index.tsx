import LoadingFetch from "@/components/LoadingFetch";
import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import RestPasswordFound from "@/components/RestPasswordFailed";
import { restPassword, validateRestToken } from "@/features/auth";
import { useAuth } from "@/features/auth/hook";
import type { ResetPasswordSchemaBodyType } from "@/schema/auth.schema";
import type { AppDispatch, RootStateReduce } from "@/types/redux";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const ResetPassword = () => {
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch<AppDispatch>();
  const { validateToken } = useSelector((state: RootStateReduce) => state.auth);
  const [ready, setReady] = useState(false);
  const navigation = useNavigate();
  if (isAuthenticated || !token) {
    window.location.replace("/");
    return null;
  }

  useEffect(() => {
    const checkToken = async () => {
      try {
        await dispatch(validateRestToken({ token }));
      } catch (error: any) {
      } finally {
        setReady(true);
      }
    };

    checkToken();
  }, [dispatch, token]);

  if (!ready) return <LoadingFetch />;

  const handleRestPassword = async (values: ResetPasswordSchemaBodyType) => {
    try {
      await toast.promise(dispatch(restPassword({ ...values })), {
        loading: "Đặt mật khẩu...",
        success: "Tạo mật khẩu mới thành công, vui lòng đăng nhập",
        error: "Có lỗi xảy ra, vui lòng thử lại.",
      });
      navigation("/login", { replace: true });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      {validateToken ? (
        <ResetPasswordForm token={token} onResetPassword={handleRestPassword} />
      ) : (
        <RestPasswordFound />
      )}
    </>
  );
};

export default ResetPassword;
