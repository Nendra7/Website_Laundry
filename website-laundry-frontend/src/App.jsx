import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Pelanggan from "./pages/Pelanggan";
import Layanan from "./pages/Layanan";
import Transaksi from "./pages/Transaksi";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="pelanggan" element={<Pelanggan />} />
          <Route path="layanan" element={<Layanan />} />
          <Route path="transaksi" element={<Transaksi />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
  );
}

export default App;
