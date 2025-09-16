"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loader from "../Loader";
import { useState } from "react";
interface InputCardProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isPassword: boolean;
  loading?: boolean;
  error?: string;
  successMessage?: string;
}
const InputCard: React.FC<InputCardProps> = ({
  title,
  value,
  onChange,
  onSubmit,
  isPassword,
  loading,
  error,
  successMessage,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="rounded-lg shadow-md border p-4 max-w-sm w-full">
      <h3 className="text-lg font-semibold text-gray-400 mb-2">{title}</h3>
      <div className="flex flex-row items-center justify-between">
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border p-2 rounded w-full mr-2"
          placeholder={`Enter new value here`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeIcon className="h-6" />
            ) : (
              <EyeSlashIcon className="h-6" />
            )}
          </button>
        )}
      </div>
      <button
        onClick={onSubmit}
        className="border mt-4 mb-0 rounded-sm p-2 cursor-pointer btn-hover-effect active:scale-95"
      >
        {loading ? <Loader /> : "Update"}
      </button>
      {error && <small className="text-red-500 mx-4">{error}</small>}
      {successMessage && (
        <small className="text-green-500 mx-4">{successMessage}</small>
      )}
    </div>
  );
};

export default InputCard;
