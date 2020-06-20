import React from "react";
import "./App.css";
import Reports from "./pages/Reports";
import ParticlesBg from "particles-bg";

function App() {
  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} color="#3182CE" num={600} />
      <Reports />
    </div>
  );
}

export default App;
