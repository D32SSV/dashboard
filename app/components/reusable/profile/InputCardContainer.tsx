import { useState } from "react";
import InputCard from "./InputCard";

interface HandlerProps {
  success?: boolean;
  message: string;
}

export const InputCardContainer = ({
  title,
  isPassword,
  submitHandler,
}: {
  title: string;
  isPassword: boolean;
  submitHandler: (value: string) => Promise<HandlerProps>;
}) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!value.trim()) return;

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const response = await submitHandler(value);

    if (response.success) {
      setSuccessMessage(response.message);
      setValue("");
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  return (
    <InputCard
      title={title}
      value={value}
      onChange={setValue}
      onSubmit={handleSubmit}
      isPassword={isPassword}
      loading={loading}
      error={error ?? undefined}
      successMessage={successMessage ?? undefined}
    />
  );
};
