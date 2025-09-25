import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Button, Stack, Select, MenuItem, InputLabel,
  FormControl, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";

export default function Transaksi() {
  const [transaksi, setTransaksi] = useState([]);
  const [form, setForm] = useState({ pelangganId: "", layananId: "", Berat_Cucian: "" });
  const [pelanggan, setPelanggan] = useState([]);
  const [layanan, setLayanan] = useState([]);

  // state untuk edit
  const [editForm, setEditForm] = useState({ id: null, pelangganId: "", layananId: "", Berat_Cucian: "" });
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    loadData();
    loadPelanggan();
    loadLayanan();
  }, []);

  async function loadData() {
    const res = await axios.get("http://localhost:3000/api/transaksi");
    setTransaksi(res.data);
  }

  async function loadPelanggan() {
    const res = await axios.get("http://localhost:3000/api/pelanggan");
    setPelanggan(res.data);
  }

  async function loadLayanan() {
    const res = await axios.get("http://localhost:3000/api/layanan");
    setLayanan(res.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/transaksi", {
      pelangganId: Number(form.pelangganId),
      layananId: Number(form.layananId),
      Berat_Cucian: Number(form.Berat_Cucian),
    });
    setForm({ pelangganId: "", layananId: "", Berat_Cucian: "" });
    loadData();
  }

  async function handleDelete(id) {
    await axios.delete(`http://localhost:3000/api/transaksi/${id}`);
    loadData();
  }

  // Edit handlers
  function handleEditOpen(t) {
    setEditForm({
      id: t.id,
      pelangganId: t.pelangganId,
      layananId: t.layananId,
      Berat_Cucian: t.Berat_Cucian,
    });
    setOpenEdit(true);
  }

  function handleEditClose() {
    setOpenEdit(false);
  }

  async function handleEditSave() {
    await axios.put(`http://localhost:3000/api/transaksi/${editForm.id}`, {
      pelangganId: Number(editForm.pelangganId),
      layananId: Number(editForm.layananId),
      Berat_Cucian: Number(editForm.Berat_Cucian),
    });
    setOpenEdit(false);
    loadData();
  }

  return (
    <div>
      <h2>Data Transaksi</h2>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          {/* Pilih Pelanggan */}
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Pelanggan</InputLabel>
            <Select
              value={form.pelangganId}
              label="Pelanggan"
              onChange={(e) => setForm({ ...form, pelangganId: e.target.value })}
            >
              {pelanggan.map((p) => (
                <MenuItem key={p.id} value={p.id}>{p.Nama}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Pilih Layanan */}
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Layanan</InputLabel>
            <Select
              value={form.layananId}
              label="Layanan"
              onChange={(e) => setForm({ ...form, layananId: e.target.value })}
            >
              {layanan.map((l) => (
                <MenuItem key={l.id} value={l.id}>
                  {l.Jenis_Layanan} ({l.Harga}/{l.Satuan})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Berat Cucian (kg)"
            type="number"
            value={form.Berat_Cucian}
            onChange={(e) => setForm({ ...form, Berat_Cucian: e.target.value })}
          />

          <Button type="submit" variant="contained" color="primary">
            Tambah
          </Button>
        </Stack>
      </form>

      {/* Table Transaksi */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama Pelanggan</TableCell>
              <TableCell>Layanan</TableCell>
              <TableCell>Berat</TableCell>
              <TableCell>Total Harga</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transaksi.map((t) => (
              <TableRow key={t.id}>
                <TableCell>{t.Nama_Pelanggan}</TableCell>
                <TableCell>{t.Jenis_Layanan}</TableCell>
                <TableCell>{t.Berat_Cucian} kg</TableCell>
                <TableCell>Rp {new Intl.NumberFormat("id-ID").format(t.Total_Harga)}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditOpen(t)}
                    >
                      Edit
                    </Button>
                    <Button color="error" onClick={() => handleDelete(t.id)}>
                      Hapus
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Edit Transaksi */}
      <Dialog open={openEdit} onClose={handleEditClose}>
        <DialogTitle>Edit Transaksi</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {/* Pilih Pelanggan */}
            <FormControl fullWidth>
              <InputLabel>Pelanggan</InputLabel>
              <Select
                value={editForm.pelangganId}
                label="Pelanggan"
                onChange={(e) => setEditForm({ ...editForm, pelangganId: e.target.value })}
              >
                {pelanggan.map((p) => (
                  <MenuItem key={p.id} value={p.id}>{p.Nama}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Pilih Layanan */}
            <FormControl fullWidth>
              <InputLabel>Layanan</InputLabel>
              <Select
                value={editForm.layananId}
                label="Layanan"
                onChange={(e) => setEditForm({ ...editForm, layananId: e.target.value })}
              >
                {layanan.map((l) => (
                  <MenuItem key={l.id} value={l.id}>
                    {l.Jenis_Layanan} ({l.Harga}/{l.Satuan})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Berat Cucian (kg)"
              type="number"
              value={editForm.Berat_Cucian}
              onChange={(e) => setEditForm({ ...editForm, Berat_Cucian: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Batal</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
