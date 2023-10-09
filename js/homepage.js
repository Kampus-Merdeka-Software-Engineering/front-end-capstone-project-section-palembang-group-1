// Isotop filter
$(document).ready(function () {
  $(".grid").isotope({
    itemSelector: ".grid-item",
  });
  $(".filter-button-group").on("click", "li", function () {
    var filterValue = $(this).attr("data-filter");
    $(".grid").isotope({ filter: filterValue });
    $(".filter-button-group li").removeClass("active");
    $(this).addClass("active");
  });
});

// Shopping Cart
let cartIcon = document.querySelector("#shopping-cart");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
  cart.classList.add("active");
};

closeCart.onclick = () => {
  cart.classList.remove("active");
};

// User
let profileIcon = document.querySelector("#user");
let sidenav = document.querySelector(".sidenav");
let closeProfile = document.querySelector("#close-profile");

profileIcon.onclick = () => {
  sidenav.classList.add("active");
};

closeProfile.onclick = () => {
  sidenav.classList.remove("active");
};

document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.querySelector("cart");
  const addToCartButton = document.getElementById("buyButton");

  // Fungsi untuk menambahkan produk ke keranjang
  async function addToCart() {
    try {
      const productId = 1; // Gantilah dengan ID produk yang ingin ditambahkan
      const amount = 1; // Jumlah produk yang ingin ditambahkan

      const response = await fetch("https://backend-group1-production.up.railway.app/cart/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, amount }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      const data = await response.json();
      console.log(data);

      // Memuat ulang isi keranjang setelah menambahkan produk
      loadCart();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Fungsi untuk menghapus produk dari keranjang
  async function removeFromCart(itemId) {
    try {
      const response = await fetch("https://backend-group1-production.up.railway.app/cart/removecart/:id", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove product from cart");
      }

      const data = await response.json();
      console.log(data);

      // Memuat ulang isi keranjang setelah menghapus produk
      loadCart();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Fungsi untuk memuat isi keranjang
  async function loadCart() {
    try {
      const response = await fetch("https://backend-group1-production.up.railway.app/cart/getcart"); // Gantilah dengan URL endpoint yang sesuai

      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }

      const cartItems = await response.json();
      cartContainer.innerHTML = ""; // Kosongkan isi keranjang sebelum menambahkan produk

      // Tampilkan daftar produk dalam keranjang
      cartItems.forEach((item) => {
        const productElement = document.createElement("div");
        productElement.classList.add("cart");
        productElement.innerHTML = `
            <p>${item.Product.name}</p>
            <p>Amount: ${item.amount}</p>
            <i class="fa-solid fa-trash cart-remove" data-id="${item.id}">Remove</i>
        `;
        cartContainer.appendChild(productElement);
      });

      // Tambahkan event listener untuk tombol "Remove"
      const removeButtons = document.querySelectorAll(".cart-remove");
      removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const itemId = button.getAttribute("data-id");
          removeFromCart(itemId);
        });
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Memuat isi keranjang saat halaman dimuat
  loadCart();

  // Menambahkan event listener untuk tombol "Add to Cart"
  addToCartButton.addEventListener("click", addToCart);
});
