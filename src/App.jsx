import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NumerologyCalculator from "./components/NumerologyCalculator";
import Authentication from "./components/Authentication";
import authCodes from "./data/authCodes.json";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const stored = localStorage.getItem("numeroAuthCode");
    if (stored) {
      try {
        const authData = JSON.parse(stored);
        const currentTime = new Date().getTime();

        if (currentTime > authData.expiry) {
          // Authentication expired, remove it and redirect to login
          localStorage.removeItem("numeroAuthCode");
          setIsAuthenticated(false);
          setUserName("");
        } else {
          // Find user name from auth codes
          const foundCode = authCodes.codes.find(
            (c) => c.code === authData.code
          );
          if (foundCode) {
            setIsAuthenticated(true);
            setUserName(foundCode.name);
          } else {
            // Invalid code, remove it
            localStorage.removeItem("numeroAuthCode");
            setIsAuthenticated(false);
            setUserName("");
          }
        }
      } catch {
        // Invalid stored data
        localStorage.removeItem("numeroAuthCode");
        setIsAuthenticated(false);
        setUserName("");
      }
    }
  };

  const handleAuthentication = (name) => {
    setIsAuthenticated(true);
    setUserName(name);
  };

  // Check authentication status periodically (every minute)
  useEffect(() => {
    const interval = setInterval(checkAuthentication, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!isAuthenticated) {
    return <Authentication onAuthenticated={handleAuthentication} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="text-center mt-4">
        <p className="text-lg font-semibold text-gray-700">
          Welcome, {userName}!
        </p>
      </div>
      <main className="flex-grow w-full max-w-[1600px] mx-auto">
        <NumerologyCalculator />
      </main>
      <Footer />
    </div>
  );
}

export default App;
