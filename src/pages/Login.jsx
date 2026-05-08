import Login from "@/components/Login";
import { Redirect, useLocation } from "wouter";
import { getFormData } from "@/utils/getformdata";
import { useAuthStore } from "@/store/auth";

export default function LoginPage() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const error = useAuthStore((state) => state.error);
  
  // EL FIX: Extraemos el mensaje de forma segura, garantizando que sea un texto (String)
  let text = "";
  if (error) {
    if (typeof error?.message === "string") {
      text = error.message;
    } else if (typeof error === "string") {
      text = error;
    } else {
      text = "Error de conexión. Verifica la configuración de red.";
    }
  }

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

    if (accessToken != "" && text === "") {
      setLocation("/dashboard");
    } else {
      setLocation(location);
    }
  };

  return (
    <>
      {accessToken && <Redirect to={"/dashboard"} />}
      <Login message={text} onSubmit={handleSignIn} />
    </>
  );
}

  return (
    <>
      {accessToken && <Redirect to={"/dashboard"} />}
      <Login message={text} onSubmit={handleSignIn} />
    </>
  );
}
