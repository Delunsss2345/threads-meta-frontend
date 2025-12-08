import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import RestPasswordFound from "@/components/auth/RestPasswordFailed";
import LoadingFetch from "@/components/common/LoadingFetch";
import {
  restPassword,
  selectAuthValidateToken,
  validateRestToken,
} from "@/features/auth";
import { useAuth } from "@/features/auth/hooks";
import type { ResetPasswordSchemaBodyType } from "@/schema/auth.schema";
import type { AppDispatch } from "@/types/redux";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const ResetPassword = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch<AppDispatch>();
  const validateToken = useSelector(selectAuthValidateToken);
  const [ready, setReady] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    if (!token) {
      window.location.replace("/");
    }
    const checkToken = async () => {
      try {
        await dispatch(validateRestToken({ token: token! }));
      } catch (error: unknown) {
        console.log(error);
      } finally {
        setReady(true);
      }
    };

    checkToken();
  }, [dispatch, token]);

  if (isAuthenticated || !token) {
    window.location.replace("/");
    return null;
  }

  if (!ready) return <LoadingFetch />;

  const handleRestPassword = async (values: ResetPasswordSchemaBodyType) => {
    try {
      await toast.promise(dispatch(restPassword({ ...values })), {
        loading: t("reset.loading"),
        success: t("reset.success"),
        error: t("reset.error"),
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
