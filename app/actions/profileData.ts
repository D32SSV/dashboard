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
) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/reset-password`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message:
          error.response.data?.message ||
          "Something went wrong in the controller",
      };
    }

    // Fallback for non-Axios errors
    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
}

export async function updateCallbackUrl(
  token: string | null,
  callBackUrl: string
) {
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
          error.response.data?.message ||
          "Something went wrong in the controller",
      };
    }

    // Fallback for non-Axios errors
    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
}
