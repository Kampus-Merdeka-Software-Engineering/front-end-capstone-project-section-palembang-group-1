//function Show Password
function myFunction() {
  var x = document.getElementById("myinput1");
  var y = document.getElementById("myinput2");

  if (x.type === "password" && y.type === "password") {
    x.type = "text";
    y.type = "text";
  } else {
    x.type = "password";
    y.type = "password";
  }
}

// go to Another Page for Sign In Button
function goToAnotherPage() {
  window.location.href = "signIn.html";
}

document.getElementById("btnsignIn").onclick = goToAnotherPage;

// script.js Handle Register
// script.js
document
  .getElementById("register-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Buat permintaan HTTP POST ke endpoint registrasi di backend
    fetch("https://backend-group1-production.up.railway.app/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle respons dari backend di sini
        // Misalnya, tampilkan pesan sukses atau pesan kesalahan
        if (data.message === "User registered successfully") {
          alert("Registrasi berhasil! Silakan login.");
           const signupButton = document.getElementById("signupbtn");
          
          // Menambahkan class ke elemen tombol login
          signupButton.classList.add("signupBtn");

          window.location.href = "homepage.html";
        } else {
          alert("Registrasi gagal. Silakan coba lagi.");
        }
      })
      .catch((error) => {
        // Handle kesalahan jika terjadi selama permintaan
        console.error("Terjadi kesalahan:", error);
      });
  });
