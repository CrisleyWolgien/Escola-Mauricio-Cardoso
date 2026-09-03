import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import NoticiasPage from "./pages/NoticiasPage";
import CalendarioPage from "./pages/CalendarioPage";
import JogosPage from "./pages/JogosPage";
import MomentosPage from "./pages/MomentosPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="noticias" element={<NoticiasPage />} />
          <Route path="calendario" element={<CalendarioPage />} />
          <Route path="jogos" element={<JogosPage />} />
          <Route path="momentos" element={<MomentosPage />} />
        </Route>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/painel" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
