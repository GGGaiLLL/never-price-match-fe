import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/homepage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* 在这里添加其他路由, e.g., <Route path="/about" element={<AboutPage />} /> */}
        </Routes>
      </main>
    </>
  );
}

export default App;
