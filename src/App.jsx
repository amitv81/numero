import Header from "./components/Header";
import Footer from "./components/Footer";
import NumerologyCalculator from "./components/NumerologyCalculator";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow w-full">
        <NumerologyCalculator />
      </main>
      <Footer />
    </div>
  );
}

export default App;
