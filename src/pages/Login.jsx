import Login from "@/components/Login";
import { Redirect, useLocation } from "wouter";
import { getFormData } from "@/utils/getformdata";
import { useAuthStore } from "@/store/auth";

export default function LoginPage() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const error = useAuthStore((state) => state.error);
  const { message, code } = error;
  const login = useAuthStore((state) => state.login);
  const [location, setLocation] = useLocation();

  const handleSignIn = async (event) => {
    event.preventDefault();

    const form = event.target;
    const isValid = form.checkValidity();

    if (!isValid) {
      return;
    }

    const data = getFormData(form);

    const { username, password } = data;

    await login({ username, password });

    if (accessToken != "" && !message) {
      setLocation("/dashboard");
    } else {
      setLocation(location);
    }
  };

  const text = message && code ? message : "";

  return (
    <>
      {accessToken && <Redirect to={"/dashboard"} />}
      <Login message={text} onSubmit={handleSignIn} />
    </>
  );
}
