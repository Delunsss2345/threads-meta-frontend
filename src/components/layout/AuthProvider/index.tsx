import { useFetchCurrentUser } from "@/features/auth/hooks";

const AuthProvider = () => {
    useFetchCurrentUser() ; 
    return null ; 
}
 
export default AuthProvider;