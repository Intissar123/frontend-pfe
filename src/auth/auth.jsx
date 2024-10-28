import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const token = localStorage.getItem("token");

    const isAuthenticated = () => {
      console.log(token)
    return token;
  };

  const getUserRole = () => {
    const decoded = jwtDecode(token);

    return decoded.role;
  };

  return { isAuthenticated, getUserRole };
};
