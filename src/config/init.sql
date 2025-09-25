create database if not exists db_laundry;
use db_laundry;

create table if not exists pelanggan (
id int auto_increment primary key,
Nama varchar(255) not null,
No_Hp varchar(255) not null,
Alamat varchar(255) not null,
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp on update current_timestamp
);

create table if not exists layanan (
id int auto_increment primary key,
Jenis_Layanan varchar(255) not null,
Harga int not null,
Satuan varchar(2) not null,
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp on update current_timestamp
);

create table if not exists transaksi (
id int auto_increment primary key,
Nama_Pelanggan varchar(255) not null,
No_Hp_Pelanggan varchar(255) not null,
Jenis_Layanan varchar(255) not null,
Harga int,
Berat_Cucian int not null,
Total_Harga int,
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp on update current_timestamp,
layananId int,
pelangganId int,
constraint fk_transaksi_layanan foreign key (layananId) references layanan(id) ON DELETE SET NULL,
constraint fk_transaksi_pelanggan foreign key (pelangganId) references pelanggan(id) ON DELETE SET NULL
);

