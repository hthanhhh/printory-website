// Xử lý search - GIỮ NGUYÊN
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function handleSearch() {
  const keyword = searchInput.value.trim();
  if (!keyword) {
    alert("Bạn chưa nhập từ khóa tìm kiếm!");
  } else {
    alert("Đang tìm: " + keyword);
  }
}

if (searchBtn) searchBtn.addEventListener("click", handleSearch);

if (searchInput) {
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  });
}

// ===== THÊM: Dữ liệu sản phẩm cho từng danh mục =====
const productsData = {
  "ao-thun": [
    {
      name: "ÁO THUN TRẮNG UNISEX",
      price: "200.000 đ",
      img: "Áo thun trắng Unisex.png",
      rating: 4,
    },
    {
      name: "ÁO THUN ĐEN UNISEX",
      price: "200.000 đ",
      img: "Áo thun đen Unisex-back.png",
      rating: 3,
    },
    {
      name: "ÁO BODY ĐỎ NỮ",
      price: "175.000 đ",
      img: "Áo body đỏ Nữ.png",
      rating: 5,
    },
    {
      name: "ÁO THUN XANH ĐEN UNISEX",
      price: "200.000 đ",
      img: "Áo thun xanh đen Unisex.png",
      rating: 4,
    },
  ],
  hoodie: [
    {
      name: "HOODIE ĐEN UNISEX",
      price: "350.000 đ",
      img: "Áo thun trắng Unisex.png",
      rating: 5,
    },
    {
      name: "HOODIE CAM FORM RỘNG",
      price: "380.000 đ",
      img: "Áo thun đen Unisex-back.png",
      rating: 4,
    },
    {
      name: "HOODIE XANH NAVY",
      price: "360.000 đ",
      img: "Áo body đỏ Nữ.png",
      rating: 5,
    },
    {
      name: "HOODIE XÁM BASIC",
      price: "340.000 đ",
      img: "Áo thun xanh đen Unisex.png",
      rating: 4,
    },
  ],
  sweater: [
    {
      name: "SWEATER DỆT KIM TRẮNG",
      price: "300.000 đ",
      img: "Áo thun trắng Unisex.png",
      rating: 4,
    },
    {
      name: "SWEATER CARDIGAN BE",
      price: "320.000 đ",
      img: "Áo thun đen Unisex-back.png",
      rating: 5,
    },
    {
      name: "SWEATER CỔ LỌ ĐEN",
      price: "310.000 đ",
      img: "Áo body đỏ Nữ.png",
      rating: 4,
    },
    {
      name: "SWEATER OVERSIZE XANH",
      price: "330.000 đ",
      img: "Áo thun xanh đen Unisex.png",
      rating: 5,
    },
  ],
  "tui-tote": [
    {
      name: "TÚI TOTE CANVAS TRẮNG",
      price: "150.000 đ",
      img: "Áo thun trắng Unisex.png",
      rating: 5,
    },
    {
      name: "TÚI TOTE VẢI BỐ ĐEN",
      price: "160.000 đ",
      img: "Áo thun đen Unisex-back.png",
      rating: 4,
    },
    {
      name: "TÚI TOTE XÁM MINIMALIST",
      price: "140.000 đ",
      img: "Áo body đỏ Nữ.png",
      rating: 5,
    },
    {
      name: "TÚI TOTE BE VINTAGE",
      price: "155.000 đ",
      img: "Áo thun xanh đen Unisex.png",
      rating: 4,
    },
  ],
  coc: [
    {
      name: "CỐC SỨ TRẮNG BASIC",
      price: "100.000 đ",
      img: "Áo thun trắng Unisex.png",
      rating: 4,
    },
    {
      name: "CỐC CERAMIC ĐEN TRƠN",
      price: "110.000 đ",
      img: "Áo thun đen Unisex-back.png",
      rating: 5,
    },
    {
      name: "CỐC THỦY TINH 2 LỚP",
      price: "120.000 đ",
      img: "Áo body đỏ Nữ.png",
      rating: 4,
    },
    {
      name: "CỐC GIỮ NHIỆT INOX",
      price: "150.000 đ",
      img: "Áo thun xanh đen Unisex.png",
      rating: 5,
    },
  ],
  mu: [
    {
      name: "MŨ LÁ TRAI ĐEN BASIC",
      price: "120.000 đ",
      img: "Áo thun trắng Unisex.png",
      rating: 4,
    },
    {
      name: "MŨ BUCKET HAT BE",
      price: "130.000 đ",
      img: "Áo thun đen Unisex-back.png",
      rating: 5,
    },
    {
      name: "MŨ SNAPBACK ĐEN",
      price: "140.000 đ",
      img: "Áo body đỏ Nữ.png",
      rating: 4,
    },
    {
      name: "MŨ NỒI XANH NAVY",
      price: "110.000 đ",
      img: "Áo thun xanh đen Unisex.png",
      rating: 4,
    },
  ],
  tat: [
    {
      name: "TẤT DÀI TRẮNG CƠ BẢN",
      price: "50.000 đ",
      img: "Áo thun trắng Unisex.png",
      rating: 3,
    },
    {
      name: "TẤT CỔ NGẮN ĐEN",
      price: "45.000 đ",
      img: "Áo thun đen Unisex-back.png",
      rating: 4,
    },
    {
      name: "TẤT THỜI TRANG HOẠ TIẾT",
      price: "60.000 đ",
      img: "Áo body đỏ Nữ.png",
      rating: 5,
    },
    {
      name: "TẤT COTTON NHIỀU MÀU",
      price: "55.000 đ",
      img: "Áo thun xanh đen Unisex.png",
      rating: 4,
    },
  ],
};

// ===== THÊM: Hàm render sản phẩm theo danh mục =====
function renderProducts(category) {
  const grid = document.getElementById("productGrid");
  const products = productsData[category] || [];

  // Xóa nội dung cũ
  grid.innerHTML = "";

  // Hiển thị 4 sản phẩm đầu tiên của danh mục
  products.slice(0, 4).forEach((product, index) => {
    const stars = "★".repeat(product.rating) + "☆".repeat(5 - product.rating);
    const delay = (index % 4) + 1;

    const cardHTML = `
      <div class="card reveal active delay-${delay}">
        <a href="product-detail.html" style="text-decoration: none; color: inherit;">
          <div class="img-box">
            <img class="product-img" src="images/products/${product.img}" alt="${product.name}" />
          </div>
          <div class="name">${product.name}</div>
          <div class="stars">${stars}</div>
          <div class="price">${product.price}</div>
        </a>
      </div>
    `;

    grid.insertAdjacentHTML("beforeend", cardHTML);
  });

  // Thêm class 'active' ngay lập tức để hiển thị animation
  setTimeout(() => {
    const newCards = grid.querySelectorAll(".card");
    newCards.forEach((card) => card.classList.add("active"));
  }, 10);
}

// ===== THAY ĐỔI: Xử lý click danh mục - RENDER sản phẩm tương ứng =====
document.addEventListener("DOMContentLoaded", () => {
  // Animation reveal - GIỮ NGUYÊN
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  reveals.forEach((el) => observer.observe(el));

  // ===== THÊM: Xử lý click danh mục - Hiển thị sản phẩm tương ứng =====
  const catItems = document.querySelectorAll(".cat-item");

  catItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active từ tất cả các item
      catItems.forEach((cat) => cat.classList.remove("active"));

      // Thêm active vào item được click
      this.classList.add("active");

      // Lấy category từ data-category và render sản phẩm
      const category = this.getAttribute("data-category");
      if (category && productsData[category]) {
        renderProducts(category);
      }
    });
  });

  // ===== THÊM: Hiển thị sản phẩm áo thun mặc định khi tải trang =====
  renderProducts("ao-thun");
});
// ===== THÊM: Xử lý click danh mục - Hiển thị sản phẩm tương ứng =====
const catItems = document.querySelectorAll(".cat-item");

catItems.forEach((item) => {
  item.addEventListener("click", function () {
    // Remove active từ tất cả các item
    catItems.forEach((cat) => cat.classList.remove("active"));

    // Thêm active vào item được click
    this.classList.add("active");

    // Lấy category từ data-category và render sản phẩm
    const category = this.getAttribute("data-category");
    if (category && productsData[category]) {
      renderProducts(category);
    }
  });
});




// 2. CÁC SỰ KIỆN TRONG DOMCONTENTLOADED
document.addEventListener("DOMContentLoaded", function () {
  // Chạy kiểm tra tên ngay khi mở trang web
  window.updateHeader();

  const loginBtn = document.getElementById("loginBtn");
  const authModal = document.getElementById("authModal");

  // Mở modal đăng nhập
  if (loginBtn && authModal) {
    loginBtn.addEventListener("click", function () {
      authModal.style.display = "flex";
    });
  }

  // Hàm đóng modal (window. để gọi từ nút X hoặc từ trang auth.html)
  window.closeAuth = function () {
    if (authModal) authModal.style.display = "none";
  };
});



window.updateHeader = function () {
  const user = localStorage.getItem("username"); 
  const loginBtn = document.getElementById("loginBtn");
  const userProfile = document.getElementById("userProfile");
  const usernameDisplay = document.getElementById("usernameDisplay");

  if (user && loginBtn && userProfile) {
    // Nếu đã đăng nhập: Ẩn nút Đăng nhập, Hiện khung tên
    loginBtn.style.display = "none";
    userProfile.style.display = "flex";

    
    usernameDisplay.innerHTML = `
      <a href="user-profile.html" style="text-decoration: none; color: inherit; cursor: pointer;">
        Hi, ${user}
      </a>
    `;
  } else {
    // Nếu chưa đăng nhập hoặc vừa đăng xuất: Hiện nút Đăng nhập, Ẩn khung tên
    if (loginBtn) loginBtn.style.display = "block";
    if (userProfile) userProfile.style.display = "none";
  }
};

// 2. CÁC SỰ KIỆN TRONG DOMCONTENTLOADED
document.addEventListener("DOMContentLoaded", function () {
  // Chạy kiểm tra tên ngay khi mở trang web
  window.updateHeader();

  const loginBtn = document.getElementById("loginBtn");
  const authModal = document.getElementById("authModal");

  // Mở modal đăng nhập
  if (loginBtn && authModal) {
    loginBtn.addEventListener("click", function () {
      authModal.style.display = "flex";
    });
  }

  // Hàm đóng modal (window. để gọi từ nút X hoặc từ trang auth.html)
  window.closeAuth = function () {
    if (authModal) authModal.style.display = "none";
  };
});

// 3. HÀM ĐĂNG XUẤT (Nên thêm vào để test cho chuẩn)
window.handleLogout = function() {
  localStorage.removeItem("username");
  localStorage.removeItem("isLoggedIn");
  window.location.reload(); // Tải lại trang để hiện lại chữ Đăng nhập
};
  updateHeader();

