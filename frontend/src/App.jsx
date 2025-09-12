
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicGenerator from "./pages/PublicGenerator.jsx";
import MainPage from "./pages/mainpage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/generator" element={<PublicGenerator />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
