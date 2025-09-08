import axios, { AxiosResponse } from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse<unknown>> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error("Login failed:", error);
    // if (error instanceof Error) return error.message;
    throw error;
  }
};
