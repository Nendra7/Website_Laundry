import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, Typography, Skeleton, Alert } from "@mui/material";
import { People, ShoppingCart, Receipt, MonetizationOn } from "@mui/icons-material";
import CountUp from "react-countup";
import { motion } from "framer-motion";

function StatCard({ title, value, icon, loading, gradient }) {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        borderRadius: 3,
        color: "#fff",
        background: gradient,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": { transform: "translateY(-8px)", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" },
      }}
    >
      <Box mr={2} sx={{ fontSize: 40 }}>{icon}</Box>
      <CardContent sx={{ flex: 1 }}>
        {loading ? (
          <>
            <Skeleton width="80%" height={20} />
            <Skeleton width="60%" height={30} sx={{ mt: 1 }} />
          </>
        ) : (
          <>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>{title}</Typography>
            <Typography variant="h5" fontWeight="bold">
              {typeof value === "number" ? <CountUp end={value} duration={1.5} separator="." /> : value}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({ pelanggan: 0, layanan: 0, transaksi: 0, pendapatan: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { (async () => await loadStats())(); }, []);

  async function loadStats() {
    try {
      setLoading(true); setError("");
      const [pelangganRes, layananRes, transaksiRes] = await Promise.all([
        axios.get("http://localhost:3000/api/pelanggan"),
        axios.get("http://localhost:3000/api/layanan"),
        axios.get("http://localhost:3000/api/transaksi"),
      ]);
      const pelanggan = Array.isArray(pelangganRes.data) ? pelangganRes.data.length : 0;
      const layanan = Array.isArray(layananRes.data) ? layananRes.data.length : 0;
      const transaksi = Array.isArray(transaksiRes.data) ? transaksiRes.data.length : 0;
      const pendapatan = Array.isArray(transaksiRes.data) ? transaksiRes.data.reduce((sum, t) => sum + (t.Total_Harga || 0), 0) : 0;
      setStats({ pelanggan, layanan, transaksi, pendapatan });
    } catch (err) {
      console.error(err);
      setError("Gagal mengambil data dari server. Pastikan backend berjalan.");
    } finally { setLoading(false); }
  }

  const items = [
    { title: "Total Pelanggan", value: stats.pelanggan, icon: <People fontSize="large" />, gradient: "linear-gradient(135deg, #667eea, #764ba2)" },
    { title: "Total Layanan", value: stats.layanan, icon: <ShoppingCart fontSize="large" />, gradient: "linear-gradient(135deg, #43e97b, #38f9d7)" },
    { title: "Total Transaksi", value: stats.transaksi, icon: <Receipt fontSize="large" />, gradient: "linear-gradient(135deg, #f7971e, #ffd200)" },
    { title: "Total Pendapatan", value: loading ? 0 : <CountUp end={stats.pendapatan} duration={1.5} separator="." prefix="Rp " />, icon: <MonetizationOn fontSize="large" />, gradient: "linear-gradient(135deg, #f953c6, #b91d73)" },
  ];

  return (
    <Box width="100%">
      {error && <Alert severity="error">{error}</Alert>}

      <Box display="flex" flexWrap="wrap" gap={3} width="100%">
        {items.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            style={{ flex: "1 1 23%" }}
          >
            <StatCard {...s} loading={loading} />
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
