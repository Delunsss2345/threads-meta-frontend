import { RegisterForm } from "@/components/RegisterForm";
import type { RegisterSchemaBodyType } from "@/schema/auth.schema";

const Register = () => {
  const handleRegister = (values: RegisterSchemaBodyType) => {};

  return (
    <>
  
        <RegisterForm onRegister={handleRegister} />
 
    </>
  );
};

export default Register;
