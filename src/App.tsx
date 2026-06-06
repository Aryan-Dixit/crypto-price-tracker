import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/:symbol" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;