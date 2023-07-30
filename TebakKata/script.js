let daftarKataEasy = ["html", "css", "javascript", "python", "java", "php", "ruby", "swift", "perl", "scala", "react", "angular", "vue", "ember", "laravel", "django", "flask", "express"];
let daftarKataMedium = ["typescript", "rust", "go", "elixir", "clojure", "spring", "symfony", "rails", "node", "flutter", "cordova", "ionic", "backbone", "meteor", "knockout", "aurelia", "backbone", "grails", "hadoop", "redux"];
let daftarKataHard = ["csharp", "cpp", "kotlin", "haskell", "lua", "angularjs", "rxjs", "vuejs", "reactjs", "emberjs", "laravel", "django", "expressjs", "springboot", "hibernate", "kafka", "cassandra", "mongodb", "redis", "docker"];

let kesempatan;
let daftarKata;
let kataAcak;
let hurufTebakan;

function setupGame(mode) {
  if (mode === "easy") {
    daftarKata = daftarKataEasy;
    kesempatan = 8;
  } else if (mode === "medium") {
    daftarKata = daftarKataMedium;
    kesempatan = 6;
  } else if (mode === "hard") {
    daftarKata = daftarKataHard;
    kesempatan = 4;
  }

  kataAcak = daftarKata[Math.floor(Math.random() * daftarKata.length)];
  hurufTebakan = [];

  // Mengisi array hurufTebakan dengan "_" untuk setiap huruf pada kata
  for (let i = 0; i < kataAcak.length; i++) {
    hurufTebakan.push("_");
  }

  document.getElementById("hasilTebakan").innerHTML = "";
  document.getElementById("tebakanInput").value = "";
  document.getElementById("setupPage").style.display = "none";
  document.getElementById("gamePage").style.display = "block";
  document.getElementById("tebakanInput").disabled = false;

  // Tambahkan kode untuk menampilkan clue jika mode adalah "easy" atau "medium"
  if (mode === "easy" || mode === "medium") {
    let clue = "Clue: Kata pemrograman yang akan ditebak memiliki " + kataAcak.length + " huruf.";
    document.getElementById("hasilTebakan").innerHTML = clue;
  }
}

function handleKeyPress(event) {
  if (event.keyCode === 13) {
    cekTebakan();
  }
}

function resetGame() {
  kesempatan = 0;
  daftarKata = [];
  kataAcak = "";
  hurufTebakan = [];
  document.getElementById("hasilTebakan").innerHTML = "";
  document.getElementById("tebakanInput").value = "";
  document.getElementById("gamePage").style.display = "none";
  document.getElementById("setupPage").style.display = "block";
}

function cekTebakan() {
  let tebakanInput = document.getElementById("tebakanInput");
  let tebakan = tebakanInput.value.toLowerCase();

  // Split the input text by spaces to handle multiple words
  let tebakanArray = tebakan.split(/\s+/);

  // Check each word in the input as a separate guess
  for (let word of tebakanArray) {
    if (word.length !== 1) {
      alert("Mohon masukkan hanya satu huruf per kata!");
      return;
    }

    // Periksa apakah huruf tebakan ada dalam kata
    let tebakanBenar = false;
    for (let i = 0; i < kataAcak.length; i++) {
      if (kataAcak[i] === word) {
        hurufTebakan[i] = word;
        tebakanBenar = true;
      }
    }

    // Kurangi kesempatan jika tebakan salah
    if (!tebakanBenar) {
      kesempatan--;
    }

    // Periksa apakah pemain menang atau kalah
    if (kesempatan === 0) {
      document.getElementById("hasilTebakan").innerHTML = "Kata yang benar adalah '" + kataAcak + "'. Ingin mencoba lagi?";
      document.getElementById("tebakanInput").disabled = true;
    } else if (hurufTebakan.join("") === kataAcak) {
      document.getElementById("hasilTebakan").innerHTML = "Selamat! Tebakan Anda benar.";
      document.getElementById("tebakanInput").disabled = true;
    } else {
      document.getElementById("hasilTebakan").innerHTML = "Kata: " + hurufTebakan.join(" ");
      document.getElementById("hasilTebakan").innerHTML += "<br>Kesempatan: " + kesempatan;
    }
  }

  // Clear the input value after processing the guess
  tebakanInput.value = "";
}
