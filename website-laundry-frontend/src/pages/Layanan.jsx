import { useEffect, useState } from "react";
import axios from "axios";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TextField, Button, Stack, Dialog, DialogTitle,
    DialogContent, DialogActions
} from "@mui/material";

export default function Layanan() {
    const [layanan, setLayanan] = useState([]);
    const [form, setForm] = useState({ Jenis_Layanan: "", Harga: "", Satuan: "" });
    const [editForm, setEditForm] = useState({ id: null, Jenis_Layanan: "", Harga: "", Satuan: "" });
    const [openEdit, setOpenEdit] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const res = await axios.get("http://localhost:3000/api/layanan");
        setLayanan(res.data);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await axios.post("http://localhost:3000/api/layanan", {
            ...form,
            Harga: Number(form.Harga),
        });
        setForm({ Jenis_Layanan: "", Harga: "", Satuan: "" });
        loadData();
    }

    async function handleDelete(id) {
        await axios.delete(`http://localhost:3000/api/layanan/${id}`);
        loadData();
    }

    function handleEditOpen(l) {
        setEditForm({ id: l.id, Jenis_Layanan: l.Jenis_Layanan, Harga: l.Harga, Satuan: l.Satuan });
        setOpenEdit(true);
    }

    function handleEditClose() {
        setOpenEdit(false);
    }

    async function handleEditSave() {
        await axios.put(`http://localhost:3000/api/layanan/${editForm.id}`, {
            Jenis_Layanan: editForm.Jenis_Layanan,
            Harga: Number(editForm.Harga),
            Satuan: editForm.Satuan,
        });
        setOpenEdit(false);
        loadData();
    }

    return (
        <div>
            <h2>Data Layanan</h2>
            <form onSubmit={handleSubmit}>
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <TextField
                        label="Jenis Layanan"
                        value={form.Jenis_Layanan}
                        onChange={(e) => setForm({ ...form, Jenis_Layanan: e.target.value })}
                    />
                    <TextField
                        label="Harga"
                        type="number"
                        value={form.Harga}
                        onChange={(e) => setForm({ ...form, Harga: e.target.value })}
                    />
                    <TextField
                        label="Satuan"
                        value={form.Satuan}
                        onChange={(e) => setForm({ ...form, Satuan: e.target.value })}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Tambah
                    </Button>
                </Stack>
            </form>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Jenis Layanan</TableCell>
                            <TableCell>Harga</TableCell>
                            <TableCell>Satuan</TableCell>
                            <TableCell>Aksi</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {layanan.map((l) => (
                            <TableRow key={l.id}>
                                <TableCell>{l.Jenis_Layanan}</TableCell>
                                <TableCell>Rp {new Intl.NumberFormat("id-ID").format(l.Harga)}</TableCell>
                                <TableCell>{l.Satuan}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleEditOpen(l)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            color="error"
                                            onClick={() => handleDelete(l.id)}
                                        >
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
                <DialogTitle>Edit Layanan</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            label="Jenis Layanan"
                            value={editForm.Jenis_Layanan}
                            onChange={(e) => setEditForm({ ...editForm, Jenis_Layanan: e.target.value })}
                        />
                        <TextField
                            label="Harga"
                            type="number"
                            value={editForm.Harga}
                            onChange={(e) => setEditForm({ ...editForm, Harga: e.target.value })}
                        />
                        <TextField
                            label="Satuan"
                            value={editForm.Satuan}
                            onChange={(e) => setEditForm({ ...editForm, Satuan: e.target.value })}
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
