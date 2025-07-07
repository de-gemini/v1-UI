import { isTokenValid } from "../utils/isTokenValid";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AuthGateway = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!isTokenValid(token)) {
      navigate("/login");
    }
  }, [navigate]);
  return <>{children}</>;
};
