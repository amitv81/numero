import { useState, useEffect, useCallback } from "react";
import authCodes from "../data/authCodes.json";

const Authentication = ({ onAuthenticated }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const validateCode = useCallback(
    (inputCode, fromStorage = false) => {
      const foundCode = authCodes.codes.find((c) => c.code === inputCode);
      if (foundCode) {
        // Set auth data with expiration time (8 hours from now)
        const expirationTime = new Date().getTime() + 8 * 60 * 60 * 1000; // 8 hours in milliseconds
        const authData = {
          code: inputCode,
          expiry: expirationTime,
        };
        localStorage.setItem("numeroAuthCode", JSON.stringify(authData));
        onAuthenticated(foundCode.name);
        setError("");
      } else {
        if (!fromStorage) {
          setError("Invalid authentication code");
        }
      }
    },
    [onAuthenticated]
  );

  useEffect(() => {
    // Check if user was previously authenticated
    const stored = localStorage.getItem("numeroAuthCode");
    if (stored) {
      try {
        const authData = JSON.parse(stored);
        const currentTime = new Date().getTime();

        // Check if the authentication has expired
        if (currentTime > authData.expiry) {
          // Authentication expired, remove it
          localStorage.removeItem("numeroAuthCode");
        } else {
          // Authentication still valid
          validateCode(authData.code, true);
        }
      } catch {
        // Handle invalid stored data
        localStorage.removeItem("numeroAuthCode");
      }
    }
  }, [validateCode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    validateCode(code);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Authentication Required
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter Authentication Code
            </label>
            <input
              type="password"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your code"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
