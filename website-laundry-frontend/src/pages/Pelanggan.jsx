import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Button, Stack, Dialog, DialogTitle,
  DialogContent, DialogActions
} from "@mui/material";

export default function Pelanggan() {
  const [pelanggan, setPelanggan] = useState([]);
  const [form, setForm] = useState({ Nama: "", No_Hp: "", Alamat: "" });

  // state untuk edit
  const [editForm, setEditForm] = useState({ id: null, Nama: "", No_Hp: "", Alamat: "" });
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const res = await axios.get("http://localhost:3000/api/pelanggan");
    setPelanggan(res.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/pelanggan", form);
    setForm({ Nama: "", No_Hp: "", Alamat: "" });
    loadData();
  }

  async function handleDelete(id) {
    await axios.delete(`http://localhost:3000/api/pelanggan/${id}`);
    loadData();
  }

  // Edit handlers
  function handleEditOpen(p) {
    setEditForm({ id: p.id, Nama: p.Nama, No_Hp: p.No_Hp, Alamat: p.Alamat });
    setOpenEdit(true);
  }

  function handleEditClose() {
    setOpenEdit(false);
  }

  async function handleEditSave() {
    await axios.put(`http://localhost:3000/api/pelanggan/${editForm.id}`, {
      Nama: editForm.Nama,
      No_Hp: editForm.No_Hp,
      Alamat: editForm.Alamat,
    });
    setOpenEdit(false);
    loadData();
  }

  return (
    <div>
      <h2>Data Pelanggan</h2>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <TextField
            label="Nama"
            value={form.Nama}
            onChange={(e) => setForm({ ...form, Nama: e.target.value })}
          />
          <TextField
            label="No HP"
            value={form.No_Hp}
            onChange={(e) => setForm({ ...form, No_Hp: e.target.value })}
          />
          <TextField
            label="Alamat"
            value={form.Alamat}
            onChange={(e) => setForm({ ...form, Alamat: e.target.value })}
          />
          <Button type="submit" variant="contained" color="primary">
            Tambah
          </Button>
        </Stack>
      </form>

      {/* Table Pelanggan */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama</TableCell>
              <TableCell>No HP</TableCell>
              <TableCell>Alamat</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pelanggan.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.Nama}</TableCell>
                <TableCell>{p.No_Hp}</TableCell>
                <TableCell>{p.Alamat}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditOpen(p)}
                    >
                      Edit
                    </Button>
                    <Button color="error" onClick={() => handleDelete(p.id)}>
                      Hapus
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Edit */}
      <Dialog open={openEdit} onClose={handleEditClose}>
        <DialogTitle>Edit Pelanggan</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Nama"
              value={editForm.Nama}
              onChange={(e) => setEditForm({ ...editForm, Nama: e.target.value })}
            />
            <TextField
              label="No HP"
              value={editForm.No_Hp}
              onChange={(e) => setEditForm({ ...editForm, No_Hp: e.target.value })}
            />
            <TextField
              label="Alamat"
              value={editForm.Alamat}
              onChange={(e) => setEditForm({ ...editForm, Alamat: e.target.value })}
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
