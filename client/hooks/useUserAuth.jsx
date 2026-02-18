import { useUserContext } from "../src/context/UserContext.jsx";

const useUserAuth = () => {
    const { user, loading, isAuthenticated, login, register, logout } = useUserContext();
    return { user, loading, isAuthenticated, login, register, logout };
};

export default useUserAuth;