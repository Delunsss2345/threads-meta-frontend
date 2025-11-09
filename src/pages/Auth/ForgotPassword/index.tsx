import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import type { ForgotPasswordSchemaBodyType } from "@/schema/auth.schema";

const ForgotPassword = () => {
  const handleForgotPassword = (values: ForgotPasswordSchemaBodyType) => {};

  return (
    <>
      <ForgotPasswordForm onForgotPassword={handleForgotPassword} />
    </>
  );
};

export default ForgotPassword;
