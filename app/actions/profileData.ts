import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getProfileData(token: string | null) {
  try {
    const response = await axios.get(`${BASE_URL}/auth/api-key`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Something went wrong",
      };
    }

    // Fallback for non-Axios errors
    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
}

export async function resetPassword(
  token: string | null,
  oldPassword: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/reset-password`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      message: "Password reset successfully",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message:
          error.response.data?.message ||
          error.response.data?.error ||
          "Server responded with an error.",
      };
    }

    return {
      success: false,
      message: "Unexpected network error occurred.",
    };
  }
}

export async function updateCallbackUrl(
  token: string | null,
  callBackUrl: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/callback`,
      {
        callbackURL: callBackUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message:
          error.response.data?.message || "Server responded with an error.",
      };
    }

    // Fallback for non-Axios errors
    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
}
