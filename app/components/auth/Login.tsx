"use client";
import { useAuth } from "@/app/context/AuthContext";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "../reusable/Loader";
import Image from "next/image";

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<AxiosResponse>;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    setError("");
    try {
      setIsLoading(true);
      const res = await onLogin(email, password);
      console.log(res.data, res.status);

      if (res.status === 200) {
        login(res.data.token, res.data.userName);
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 rounded flex flex-col items-center justify-start h-screen bg-gray-400 ">
      <Image
        src="/logo.png"
        alt="logo"
        width={200}
        height={200}
        className="-mt-10 mb-10 md:-mt-0 rounded-2xl"
        priority
      />
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Dashboard Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="w-full mt-1 p-2 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="w-full mt-1 p-2 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center"
        >
          {isLoading ? <Loader /> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
