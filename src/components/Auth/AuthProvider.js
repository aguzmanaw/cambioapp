import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";
import { navigate } from "wouter/use-location";
import { useLocationProperty } from "wouter/use-location";

const hashLocation = () => window.location.hash.replace(/^#/, "") || "/";

const hashNavigate = (to) => navigate("#" + to);

const useHashLocation = () => {
  const location = useLocationProperty(hashLocation);
  return [location, hashNavigate];
};

export function AuthProvider({ children = [] }) {
  const isAuth = useAuthStore((state) => state.isAuth);
  const [location] = useHashLocation();

  useEffect(() => {
    if (!isAuth && location !== "/") navigate("/");
  }, [isAuth, location]);

  return children;
}
