# PRINTORY – Print on Demand Website

## 1. Giới thiệu
PRINTORY được tạo ra để giữ lại những điều từng rất quan trọng, một khoảnh khắc, một hình ảnh, một câu chuyện riêng. Chúng tôi tin rằng cảm xúc không nên chỉ tồn tại trong trí nhớ, mà xứng đáng được hiện diện bằng hình hài cụ thể. Mỗi sản phẩm tại PRINTORY là một dấu ấn được in ra, được nâng niu và lưu giữ theo năm tháng. Bởi vì có những câu chuyện, nếu không giữ lại, thời gian sẽ mang chúng đi.

## 2. Công nghệ sử dụng
- HTML5
- CSS3
- Bootstrap
- JavaScript
- Figma (Prototype)

## 3. Sitemap
Home
├── Products
│   ├── Categories
│   │   ├── T-Shirts
│   │   ├── Hoodies
│   │   ├── Sweaters
│   │   ├── Tote Bags
│   │   ├── Mugs
│   │   ├── Hats
│   │   └── Socks
│   ├── Product Details
│   │   └── Reviews
│   └── Design
│       ├── Your Story
│       └── Preview
│
├── Cart
│   └── Checkout
│
├── Account
│   ├── Login / Register
│   ├── User Profile
│   └── Orders
│
└── Other Pages
    ├── About Us
    ├── Support
    └── Printory Blog
        └── Blog Details


## 4. Phân công công việc


## 5. Hướng dẫn chạy
### 🔹 Yêu cầu
- Trình duyệt web hiện đại (Google Chrome, Microsoft Edge, Firefox)
- Visual Studio Code (khuyến nghị)
- Extension **Live Server** cho VS Code

---

### 🔹 Cách 1: Chạy bằng Live Server 

1. Mở **Visual Studio Code**
2. Chọn **File → Open Folder** và mở thư mục dự án
3. Cài đặt extension **Live Server**
4. Chuột phải vào file `index.html` → chọn **Open with Live Server**
5. Trình duyệt sẽ tự động mở website tại địa chỉ:
http://127.0.0.1:5500/index.html

---

### 🔹 Cách 2: Chạy trực tiếp trên trình duyệt

1. Mở thư mục dự án
2. Click đúp vào file `index.html`
3. Website sẽ được hiển thị trực tiếp trên trình duyệt

> **Lưu ý:** Cách này phù hợp để xem giao diện. Để đảm bảo các chức năng hoạt động ổn định, khuyến nghị sử dụng Live Server.

---

### 🔹 Cách 3: Chạy online bằng GitHub Pages

1. Truy cập repository của dự án trên GitHub
2. Vào **Settings → Pages**
3. Chọn:
- **Branch**: `main`
- **Folder**: `/root`
4. Lưu lại và chờ GitHub khởi tạo
5. Truy cập website tại:
https://<username>.github.io/<repository-name>/

---

### 🔹 Cấu trúc thư mục chính

printory-website/
├── index.html
├── auth.html
├── cart.html
├── checkout.html
├── user-profile.html
├── css/
├── js/
└── images/


---

### 🔹 Ghi chú
- Dự án được xây dựng bằng HTML, CSS và JavaScript thuần
- Không yêu cầu cài đặt backend hoặc cơ sở dữ liệu
- Dữ liệu demo (đăng nhập, giỏ hàng, thiết kế) được lưu trữ bằng `localStorage`
- Website hỗ trợ hiển thị trên nhiều thiết bị và trình duyệt
