// Thay đổi dòng khai báo mảng ban đầu
// Thay vì dùng mảng có sẵn, ta lấy từ localStorage

let cartItems = JSON.parse(localStorage.getItem("printoryCart")) || [];

// Thêm một hàm để đồng bộ dữ liệu mỗi khi thay đổi
function syncLocalStorage() {
    localStorage.setItem('printoryCart', JSON.stringify(cartItems));
}



function saveCart() {
  localStorage.setItem("printoryCart", JSON.stringify(cartItems));
}


// Render giỏ hàng
function renderCart() {
  const container = document.getElementById("cartItems");

  if (cartItems.length === 0) {
    container.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <h3>Giỏ hàng trống</h3>
                        <p>Hãy thêm sản phẩm vào giỏ hàng!</p>
                    </div>
                `;
    updateTotal();
    return;
  }

  container.innerHTML = cartItems
    .map(
      (item) => `
                <div class="cart-item">
                    <div>
                        <input type="checkbox" class="item-checkbox" data-id="${
                          item.id
                        }" onchange="updateTotal()">
                    </div>
                    <div class="item-image-wrapper">
                        <img src="${item.image}" alt="${
        item.name
      }" class="item-image" onerror="this.src='https://via.placeholder.com/100'">
                        <div class="item-details">
                            <div class="item-name">${item.name}</div>
                            <div class="item-size">Size: <span>${
                              item.size
                            }</span></div>
                            <button class="view-design-btn" onclick="viewDesign(${
                              item.id
                            })">
                                Xem thiết kế
                            </button>
                        </div>
                    </div>
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="decreaseQty(${
                          item.id
                        })">-</button>
                        <input type="text" class="qty-input" value="${
                          item.quantity
                        }" readonly>
                        <button class="qty-btn" onclick="increaseQty(${
                          item.id
                        })">+</button>
                    </div>
                    <div class="item-price">${formatPrice(item.price)}đ</div>
                    <div>
                        <button class="delete-btn" onclick="showDeleteModal(${
                          item.id
                        })">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `
    )
    .join("");

  updateTotal();
}

// Format giá tiền
function formatPrice(price) {
  return price.toLocaleString("vi-VN");
}

// Tăng số lượng - THAY HÀM NÀY
function increaseQty(id) {
  const item = cartItems.find((i) => i.id === id);
  if (item) {
    item.quantity++;
    // Lưu lại số lượng mới vào bộ nhớ
    localStorage.setItem("printoryCart", JSON.stringify(cartItems));
    renderCart();
    updateTotal();
  }
}

function decreaseQty(id) {
  const item = cartItems.find((i) => i.id === id);
  if (item && item.quantity > 1) {
    item.quantity--;
    // Lưu lại số lượng mới vào bộ nhớ
    localStorage.setItem("printoryCart", JSON.stringify(cartItems));
    renderCart();
    updateTotal();
  }
}

// Hiện modal xóa
function showDeleteModal(id) {
  deleteItemId = id;
  document.getElementById("deleteModal").classList.add("show");
}

// Đóng modal xóa
function closeDeleteModal() {
  document.getElementById("deleteModal").classList.remove("show");
  deleteItemId = null;
}

function confirmDelete() {
  if (deleteItemId !== null) {
    // 1. Xóa trong mảng tạm
    cartItems = cartItems.filter((item) => item.id !== deleteItemId);
    
    // 2. LƯU THAY ĐỔI VÀO BỘ NHỚ (Quan trọng nhất)
    localStorage.setItem("printoryCart", JSON.stringify(cartItems));
    
    // 3. Cập nhật giao diện
    renderCart();
    updateTotal();
    closeDeleteModal();
  }
}

// Xem thiết kế
function viewDesign(id) {
  const item = cartItems.find((i) => i.id === id);
  if (item) {
    document.getElementById(
      "designTitle"
    ).textContent = `Thiết kế - ${item.name}`;
    document.getElementById("designImage").src = item.design;
    document.getElementById("designModal").classList.add("show");
  }
}

// Đóng modal thiết kế
function closeDesignModal() {
  document.getElementById("designModal").classList.remove("show");
}

// Chọn tất cả
document.getElementById("selectAll").addEventListener("change", function () {
  const checkboxes = document.querySelectorAll(".item-checkbox[data-id]");
  checkboxes.forEach((cb) => (cb.checked = this.checked));
  updateTotal();
});

// Cập nhật tổng
function updateTotal() {
  const checkboxes = document.querySelectorAll(
    ".item-checkbox[data-id]:checked"
  );
  let totalItems = 0;
  let totalPrice = 0;

  checkboxes.forEach((cb) => {
    const id = parseInt(cb.dataset.id);
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      totalItems += item.quantity;
      totalPrice += item.price * item.quantity;
    }
  });

  document.getElementById("totalItems").textContent = totalItems;
  document.getElementById("totalPrice").textContent =
    formatPrice(totalPrice) + "đ";
}

// Tiếp tục mua sắm
function continueShopping() {
  window.location.href = "products.html";
}

// Thanh toán - CẬP NHẬT HÀM NÀY
function checkout() {
  const checkboxes = document.querySelectorAll(
    ".item-checkbox[data-id]:checked"
  );
  if (checkboxes.length === 0) {
    alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
    return;
  }

  // Lấy các sản phẩm đã chọn
  const selectedItems = [];
  checkboxes.forEach((cb) => {
    const id = parseInt(cb.dataset.id);
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      selectedItems.push(item);
    }
  });

  // Lưu vào sessionStorage
  sessionStorage.setItem("selectedItems", JSON.stringify(selectedItems));

  // Chuyển sang trang checkout
  window.location.href = "checkout.html";
}

// Đóng modal khi click bên ngoài
window.onclick = function (event) {
  const deleteModal = document.getElementById("deleteModal");
  const designModal = document.getElementById("designModal");

  if (event.target === deleteModal) {
    closeDeleteModal();
  }
  if (event.target === designModal) {
    closeDesignModal();
  }
};

// Render lần đầu
renderCart();
