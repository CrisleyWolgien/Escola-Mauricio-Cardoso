import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import NoticiasPage from "./pages/NoticiasPage";
import NoticiaDetalhePage from "./pages/NoticiaDetalhePage";
import CalendarioPage from "./pages/CalendarioPage";
import JogosPage from "./pages/JogosPage";
import MomentosPage from "./pages/MomentosPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import AdminEvents from "./pages/AdminEvents";
import AdminGallery from "./pages/AdminGallery";
import AdminGames from "./pages/AdminGames";
import AdminSettings from "./pages/AdminSettings";
import PostsPage from "./pages/PostsPage";
import PostDetailPage from "./pages/PostDetailPage";
import AdminPosts from "./pages/AdminPosts";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="noticias" element={<NoticiasPage />} />
          <Route path="noticias/:announcementId" element={<NoticiaDetalhePage />} />
          <Route path="calendario" element={<CalendarioPage />} />
          <Route path="jogos" element={<JogosPage />} />
          <Route path="momentos" element={<MomentosPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="posts/:postId" element={<PostDetailPage />} />
        </Route>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/painel" element={<AdminDashboard />} />
        <Route path="/admin/avisos" element={<AdminAnnouncements />} />
        <Route path="/admin/calendario" element={<AdminEvents />} />
        <Route path="/admin/galeria" element={<AdminGallery />} />
        <Route path="/admin/jogos" element={<AdminGames />} />
        <Route path="/admin/configuracoes" element={<AdminSettings />} />
        <Route path="/admin/posts" element={<AdminPosts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
