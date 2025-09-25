export default function Contact() {
  return (
    <div className="container">
      <h2 className="mb-3">Kontak Kami</h2>
      <p>Silakan hubungi kami melalui informasi berikut:</p>
      <ul className="list-unstyled">
        <li><strong>Alamat:</strong> Jl. Lumbu Utara 1A No. 66, Bekasi</li>
        <li><strong>Telepon:</strong> 0812-3456-7890</li>
        <li><strong>Email:</strong> info@laundrybekasi.com</li>
      </ul>

      <h4 className="mt-4">Formulir Kontak</h4>
      <form className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nama</label>
          <input type="text" className="form-control" placeholder="Masukkan nama Anda" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="Masukkan email Anda" />
        </div>
        <div className="mb-3">
          <label className="form-label">Pesan</label>
          <textarea className="form-control" rows="4" placeholder="Tulis pesan Anda"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Kirim</button>
      </form>

      <h4 className="mt-4">Lokasi Kami</h4>
      <div className="ratio ratio-16x9">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3192943444375!2d107.0021733152968!3d-6.240641295481797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6991b004b7c84f%3A0x301576d14febd40!2sBekasi%20City%2C%20West%20Java!5e0!3m2!1sid!2sid!4v1638354906972!5m2!1sid!2sid"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
