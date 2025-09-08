"use client";
import { login } from "./actions/login";
import LoginForm from "./components/auth/Login";

export default function Home() {
  const handleLogin = async (email: string, password: string) => {
    const res = await login(email, password);
    return res;
  };

  return (
    <div className="font-sans min-h-screen ">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}
