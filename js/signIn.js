// Show Password
function signInPass() {
  var x = document.getElementById("inputPass");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

// go to Another Page for Sign Up Button
function goToAnotherPage() {
  window.location.href = "signUp.html";
}

document.getElementById("btnsignUp").onclick = goToAnotherPage;

//  Menghandle submit form login
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("inputPass").value;

    // Buat permintaan HTTP POST ke endpoint login di backend
    fetch("/api/login", {
      url: 'https://backend-group1-production.up.railway.app/users/login',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle respons dari backend di sini
        if (data.message === "Login successful") {
          alert("Login berhasil!");
          const loginButton = document.getElementById("loginbtn");
          
          // Menambahkan class ke elemen tombol login
          loginButton.classList.add("loginBtn");

          window.location.href = "homepage.html"; // Atau lakukan tindakan lain seperti mengarahkan pengguna ke halaman utama
        } else {
          alert("Login gagal. Cek kembali email dan password Anda.");
        }
      })
      .catch((error) => {
        // Handle kesalahan jika terjadi selama permintaan
        console.error("Terjadi kesalahan:", error);
      });
  });
