import React, { useEffect, useState } from "react";

interface AlertProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const alertClass =
    type === "success"
      ? "bg-green-100 border-green-400 text-green-700"
      : "bg-red-100 border-red-400 text-red-700";

  return (
    <div
      className={`border px-4 py-3 rounded relative ${alertClass} ${
        visible ? "" : "hidden"
      }`}
      role="alert"
    >
      <strong className="font-bold"></strong>
      <span className="block sm:inline ml-2">{message}</span>
      <span
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
        onClick={() => setVisible(false)}
      >
        <svg
          className="h-6 w-6 text-black-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M14.293 5.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586l4.293-4.293z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
};

export default Alert;
