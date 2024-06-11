import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  doc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCpCIglYrqTgxH7xrPiHaxvM6_sSStELsU",
  authDomain: "undangan-online-662c1.firebaseapp.com",
  projectId: "undangan-online-662c1",
  storageBucket: "undangan-online-662c1.appspot.com",
  messagingSenderId: "235435101200",
  appId: "1:235435101200:web:b81c6261e7417848728e95",
};

var app = initializeApp(firebaseConfig);

var db = getFirestore(app);

const getTamu = (callback) => {
  onSnapshot(collection(db, "tamu"), (querySnapshot) => {
    let tamu = [];
    querySnapshot.forEach((doc) => {
      tamu.push(doc.data());
    });
    callback(tamu);
  });
};

const formatDate = (date) => {
  const now = new Date(); // Waktu saat ini
  const seconds = Math.floor((now - date) / 1000); // Selisih dalam detik

  if (seconds < 60) {
    return `${seconds} detik yang lalu`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} menit yang lalu`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} jam yang lalu`;
  } else {
    // Tampilkan tanggal lengkap jika lebih dari 1 hari yang lalu
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("id-ID", options);
  }
};
const tamuList = (tamu) => {
  if (tamu.length == 0) {
    return '<div class="py-4 px-8 text-xs text-[#999489]">Tidak ada tamu yang mengirimkan ucapan</div>';
  }
  return tamu
    .map((tamu) => {
      return `<div class="py-4 px-8 text-xs text-[#999489]">
              <h1 class="font-bold text-[#b4a480] capitalize">${tamu.nama}</h1>
              <p class="my-1">${tamu.pesan}</p>
              <div class="flex gap-2 items-center">
                <i class="fa-solid fa-clock text-[#b4a480]"></i>
                <p>${formatDate(new Date(tamu.createdAt))}</p>
              </div>
            </div>`;
    })
    .join("");
};

const tamuContainer = document.getElementById("ucapan");

getTamu((tamu) => {
  tamuContainer.innerHTML = tamuList(tamu);
});

const addPesan = async (nama, pesan) => {
  const createdAt = new Date().toISOString();
  const docRef = await addDoc(collection(db, "tamu"), {
    nama,
    pesan,
    createdAt,
  });
  console.log("Document written with ID: ", docRef.id);
};

const formUcapan = document.getElementById("ucapanDoa");

formUcapan.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(formUcapan);
  const nama = formData.get("nama");
  const pesan = formData.get("pesan");
  const createdAt = new Date();
  addPesan(nama, pesan, createdAt);
});
