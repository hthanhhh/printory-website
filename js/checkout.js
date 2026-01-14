// Lấy sản phẩm đã chọn từ localStorage
let selectedItems = JSON.parse(sessionStorage.getItem("selectedItems")) || [];

// Nếu không có sản phẩm nào được chọn, redirect về cart
if (selectedItems.length === 0) {
  // Thử lấy từ localStorage (fallback)
  selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];

  if (selectedItems.length === 0) {
    alert("Vui lòng chọn sản phẩm từ giỏ hàng!");
    window.location.href = "cart.html";
  }
}

// Format giá tiền
function formatPrice(price) {
  return price.toLocaleString("vi-VN");
}

// Render đơn hàng
function renderOrder() {
  const container = document.getElementById("orderItems");

  if (selectedItems.length === 0) {
    container.innerHTML = `
                    <div class="empty-order">
                        <i class="fas fa-box-open"></i>
                        <h3>Không có sản phẩm</h3>
                        <p>Vui lòng chọn sản phẩm từ giỏ hàng!</p>
                    </div>
                `;
    return;
  }

  container.innerHTML = selectedItems
    .map(
      (item) => `
                <div class="order-item">
                    <img src="${item.image}" alt="${
        item.name
      }" class="item-image" onerror="this.src='https://via.placeholder.com/80'">
                    <div class="item-info">
                        <div class="item-name">${item.name}</div>
                        <div class="item-details">Alien người ngoài hành tinh</div>
                        <div class="item-details">Size: ${item.size}</div>
                        <div class="item-quantity">x${item.quantity}</div>
                    </div>
                    <div class="item-price">${formatPrice(item.price)} VNĐ</div>
                </div>
            `
    )
    .join("");

  // Tính tổng - THAY ĐOẠN NÀY
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = 30000;
  const total = subtotal + shippingFee;

  document.getElementById("totalPrice").textContent =
    formatPrice(total) + " VNĐ";
  document.getElementById("subtotal").textContent =
    formatPrice(subtotal) + " VNĐ";
  document.getElementById("shippingFee").textContent =
    formatPrice(shippingFee) + " VNĐ";
}

// Validate form
function validateForm() {
  let isValid = true;

  // Họ tên
  const fullName = document.getElementById("fullName").value.trim();
  if (fullName === "") {
    document.getElementById("nameError").classList.add("show");
    isValid = false;
  } else {
    document.getElementById("nameError").classList.remove("show");
  }

  // Số điện thoại
  const phone = document.getElementById("phone").value.trim();
  const phoneRegex = /^[0-9]{10}$/;
  if (phone === "" || !phoneRegex.test(phone)) {
    document.getElementById("phoneError").classList.add("show");
    isValid = false;
  } else {
    document.getElementById("phoneError").classList.remove("show");
  }

  // Địa chỉ
  const address = document.getElementById("address").value.trim();
  if (address === "") {
    document.getElementById("addressError").classList.add("show");
    isValid = false;
  } else {
    document.getElementById("addressError").classList.remove("show");
  }

  // Email
  const email = document.getElementById("email").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "" || !emailRegex.test(email)) {
    document.getElementById("emailError").classList.add("show");
    isValid = false;
  } else {
    document.getElementById("emailError").classList.remove("show");
  }

  return isValid;
}

// Hoàn tất đặt hàng
function completeOrder() {
  if (!validateForm()) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  // Lấy thông tin
  const orderData = {
    customer: {
      fullName: document.getElementById("fullName").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      address: document.getElementById("address").value.trim(),
      email: document.getElementById("email").value.trim(),
    },
    payment: document.querySelector('input[name="payment"]:checked').value,
    items: selectedItems,
    subtotal: selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
    shippingFee: 30000,
    total:
      selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
      30000,
    orderDate: new Date().toISOString(),
  };

  // Lưu vào localStorage
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(orderData);
  localStorage.setItem("orders", JSON.stringify(orders));

  // Xóa sản phẩm đã đặt khỏi giỏ hàng - THAY ĐOẠN NÀY
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const selectedIds = selectedItems.map((item) => item.id);
  cart = cart.filter((item) => !selectedIds.includes(item.id));
  localStorage.setItem("cart", JSON.stringify(cart));

  // Cập nhật cartItems nếu đang ở trang cart (để đồng bộ)
  if (window.opener && window.opener.cartItems) {
    window.opener.cartItems = cart;
    window.opener.renderCart();
  }

  // Xóa selectedItems
  sessionStorage.removeItem("selectedItems");
  localStorage.removeItem("selectedItems");

  // Chuyển sang trang order
  alert("Đặt hàng thành công!");
  window.location.href = "order.html";
}

// Xử lý search
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

// Render lần đầu
renderOrder();
