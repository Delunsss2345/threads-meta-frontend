import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { selectAuthState, verifyEmail } from "@/features/auth";
import type { AppDispatch } from "@/types/redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { loadingRequest, error } = useSelector(selectAuthState);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      try {
        await dispatch(verifyEmail({ token })).unwrap();

        navigate("/login", {
          replace: true,
          state: { verified: true },
        });
      } catch (err) {
        console.error(err);
      }
    };

    verify();
  }, [token, dispatch, navigate]);

  return (
    <div className="w-full max-w-sm mx-auto text-center mt-12">
      {loadingRequest && (
        <div className="flex items-center justify-center">
          <Spinner />
          <p className="mt-4 text-sm text-muted-foreground">
            {t("auth.verifying")}
          </p>
        </div>
      )}

      {!loadingRequest && error && (
        <>
          <p className="text-red-500 mb-6">{error}</p>
          <Button
            className="w-full h-11 rounded-xl font-semibold"
            onClick={() => navigate("/login")}
          >
            {t("auth.goToLogin")}
          </Button>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
