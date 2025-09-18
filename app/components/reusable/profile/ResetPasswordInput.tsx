"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Loader from "../Loader";
import { useAuth } from "@/app/context/AuthContext";
import { resetPassword } from "@/app/actions/profileData";

export function ResetPasswordInput() {
  const { token } = useAuth();
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const onSubmit = async () => {
    if (!oldPassword.trim() || !newPassword.trim()) {
      setError("Both fields required");
      return;
    }
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    const response = await resetPassword(token, oldPassword, newPassword);
    if (response.success) {
      setSuccessMessage(response.message);
      setOldPassword("");
      setNewPassword("");
    } else {
      setError(response.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="rounded-lg shadow-md border p-4 max-w-sm w-full">
      <h3 className="text-lg font-semibold text-gray-400 mb-2">
        Change Password
      </h3>
      <div className="flex flex-row items-center justify-between">
        <input
          type={!showOldPassword ? "password" : "text"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="border p-2 rounded w-full mr-2"
          placeholder={`Enter old password here`}
        />

        <button
          type="button"
          onClick={() => setShowOldPassword((prev) => !prev)}
          className="text-gray-500 hover:text-gray-700"
        >
          {showOldPassword ? (
            <EyeIcon className="h-6" />
          ) : (
            <EyeSlashIcon className="h-6" />
          )}
        </button>
      </div>
      <div className="flex flex-row items-center justify-between mt-4">
        <input
          type={!showNewPassword ? "password" : "text"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 rounded w-full mr-2"
          placeholder={`Enter new password here`}
        />
        <button
          type="button"
          onClick={() => setShowNewPassword((prev) => !prev)}
          className="text-gray-500 hover:text-gray-700"
        >
          {showNewPassword ? (
            <EyeIcon className="h-6" />
          ) : (
            <EyeSlashIcon className="h-6" />
          )}
        </button>
      </div>

      <button
        onClick={onSubmit}
        className="border mt-4 mb-0 rounded-sm p-2 cursor-pointer btn-hover-effect active:scale-95"
      >
        {isLoading ? <Loader /> : "Update"}
      </button>
      {error && <small className="text-red-500 mx-4">{error}</small>}
      {successMessage && (
        <small className="text-green-500 mx-4">{successMessage}</small>
      )}
    </div>
  );
}
