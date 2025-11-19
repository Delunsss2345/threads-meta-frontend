import { RegisterForm } from "@/components/RegisterForm";
import { register } from "@/features/auth";
import { useAuth } from "@/features/auth/hook";
import type { RegisterSchemaBodyType } from "@/schema/auth.schema";
import type { AppDispatch } from "@/types/redux";
import { useDispatch } from "react-redux";

const Register = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    window.location.replace("/");
    return null;
  }
  const dispatch = useDispatch<AppDispatch>();
  const handleRegister = async (values: RegisterSchemaBodyType) => {
    try {
      const response = await dispatch(register(values));
      console.log(response);
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
