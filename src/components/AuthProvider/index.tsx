import { useFetchCurrentUser } from "@/features/auth/hook";

const AuthProvider = () => {
    useFetchCurrentUser() ; 
    return null ; 
}
 
export default AuthProvider;