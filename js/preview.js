// ==========================================
// 1. XỬ LÝ ZOOM
// ==========================================
let currentZoom = 100;
const productImage = document.querySelector(".product-image");
const designOverlay = document.querySelector(".design-overlay");
const zoomLevelDisplay = document.getElementById("zoomLevel");

function updateZoom() {
  const scale = currentZoom / 100;
  if (productImage) productImage.style.transform = `scale(${scale})`;
  if (designOverlay) designOverlay.style.transform = `scale(${scale})`;
  zoomLevelDisplay.textContent = `${currentZoom}%`;
}

document.getElementById("zoomIn").onclick = () => {
  if (currentZoom < 200) {
    currentZoom += 10;
    updateZoom();
  }
};

document.getElementById("zoomOut").onclick = () => {
  if (currentZoom > 50) {
    currentZoom -= 10;
    updateZoom();
  }
};

// ==========================================
// 2. XỬ LÝ ĐĂNG NHẬP (HEADER)
// ==========================================
// Gọi hàm này để Header hiện đúng tên nếu đã đăng nhập
if (window.updateHeader) {
    window.updateHeader();
}

// ==========================================
// 3. HÀM THÊM VÀO GIỎ HÀNG (QUAN TRỌNG)
// ==========================================
function handleAddToCart() {
  // 1. Lấy thông tin từ giao diện (Dùng đúng class/id trong HTML của bạn)
  const name = document.querySelector(".product-name").innerText;
  const priceText = document.getElementById("totalPrice").innerText;
  const price = parseInt(priceText.replace(/\D/g, "")); 
  
  // Lấy ảnh gốc (ví dụ lấy từ background hoặc thẻ img)
  const image = "images/products/Áo thun trắng Unisex.png"; 
  
  // Lấy ảnh thiết kế (phần quan trọng nhất của trang preview)
  const designImg = document.querySelector(".demo-design img")?.getAttribute("src") || "";

  // 2. Tạo đối tượng sản phẩm mới
  const newItem = {
    id: Date.now(),
    name: name,
    price: price,
    image: image,
    size: "S", // Mặc định hoặc lấy từ nút active
    quantity: 1, // Hiện tại HTML đang để cứng là 1
    design: designImg
  };

  // 3. Lưu vào localStorage (Dùng chung key 'printoryCart')
  let cart = JSON.parse(localStorage.getItem("printoryCart")) || [];
  
  // Kiểm tra trùng
  const existingIndex = cart.findIndex(item => item.name === newItem.name && item.design === newItem.design);
  
  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push(newItem);
  }

  localStorage.setItem("printoryCart", JSON.stringify(cart));

  // 4. Hiển thị thông báo
  const notification = document.getElementById("notification");
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
    // Tùy chọn: Chuyển hướng sang giỏ hàng sau khi hiện thông báo
    // window.location.href = "cart.html";
  }, 2000);
}

// Gán sự kiện cho nút "Thêm vào giỏ hàng"
document.getElementById("addToCart").onclick = (e) => {
    e.preventDefault(); // Ngăn chặn chuyển trang ngay lập tức nếu dùng thẻ <a>
    handleAddToCart();
};

// View angles (Chỉ để đổi hiệu ứng nút)
document.querySelectorAll(".angle-btn").forEach((btn) => {
  btn.onclick = () => {
    document.querySelectorAll(".angle-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  };
});
// ==========================================
// 4. XỬ LÝ ĐỔI MẶT TRƯỚC / MẶT SAU
// ==========================================
const mainImg = document.getElementById("mainProductImg");
const angleButtons = document.querySelectorAll(".angle-btn");

const images = {
    front: "images/products/Áo thun trắng Unisex.png",
    back: "images/products/Áo thun trắng Unisex-back.png" 
};

angleButtons.forEach((btn) => {
    btn.onclick = () => {
        // 1. Đổi trạng thái Active cho nút
        angleButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // 2. Lấy chữ trong nút để biết người dùng chọn mặt nào
        const label = btn.querySelector("span").innerText;

        if (label === "Mặt sau") {
            mainImg.src = images.back;
            // Ẩn thiết kế nếu thiết kế chỉ nằm ở mặt trước (tùy chọn)
            document.querySelector(".design-overlay").style.display = "none";
        } else {
            mainImg.src = images.front;
            // Hiện lại thiết kế ở mặt trước
            document.querySelector(".design-overlay").style.display = "flex";
        }
    };
});