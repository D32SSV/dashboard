import { useState } from "react";

interface CopyJsonButtonProp<T> {
  data: T;
}

export default function CopyJsonButton<T>({ data }: CopyJsonButtonProp<T>) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 700);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        aria-label="Copy JSON to clipboard"
        onClick={handleCopy}
        className="p-1 px-2 border rounded text-sm hover:bg-pink-300 dark:hover:bg-violet-400"
      >
        Copy JSON
      </button>
      {copied && (
        <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded shadow">
          Copied!
        </div>
      )}
    </div>
  );
}
