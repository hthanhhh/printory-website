const slides = [
    {
        image: "images/Tainguyen/blog_tet.jpg", 
        date: "DIỄN RA TỪ 31/12 - 1/2/2026", 
        title: "NĂM MỚI RẠNG NGỜI <br> KHỞI SẮC", 
        desc: "Trong không khí hân hoan của những ngày đầu năm mới 2026, PRINTORY chính thức khởi động chiến dịch quy mô lớn mang tên Năm Mới Rạng Ngời Khởi Sắc. Đây không chỉ là lời tri ân gửi đến khách hàng mà còn là cột mốc đánh dấu sự lột xác về phong cách với những bộ sưu tập thiết kế độc bản.", 
        bg: "#B40000", 
        bgRight: "#B40000",
        link: "PrintoryBlogDetail11.html"  
    },
    { 
        image: "images/Tainguyen/blog_giangsinh.jpg", 
        date: "DIỄN RA TỪ 15/12 – 30/12/2025", 
        title: "GIÁNG SINH <br> ẤM ÁP", 
        desc: "Giáng sinh không chỉ là dịp để tụ họp, mà còn là thời điểm để làm mới không gian sống và tủ đồ của bạn. Hòa chung không khí lễ hội, PRINTORY chính thức tung ra cơn mưa ưu đãi cực khủng cùng bộ sưu tập họa tiết Giáng sinh có một không hai.", 
        bg: "#0B245B", 
        bgRight: "#0B245B",
        link: "PrintoryBlogDetail12.html" 
    },
    { 
        image: "images/Tainguyen/blog_ngay2010.jpg", 
        date: "DIỄN RA TỪ 10/10 – 25/10/2025", 
        title: "GÓI TRỌN <br> YÊU THƯƠNG", 
        desc: "Tháng 10 về mang theo những cơn gió nhẹ nhàng và cũng là dịp để chúng ta tôn vinh những người phụ nữ tuyệt vời nhất. Với mong muốn trở thành cầu nối giúp bạn gửi gắm tâm tư, Printory chính thức ra mắt chiến dịch Gói Trọn Yêu Thương – nơi mỗi món quà là một lời tri ân sâu sắc dành cho một nửa thế giới.", 
        bg: "#F06292", 
        bgRight: "#F06292",
        link: "PrintoryBlogDetail13.html" 
    },
    { 
        image: "images/Tainguyen/blog_quockhanh.jpg",
        date: "DIỄN RA TỪ 25/8 – 10/9/2025", 
        title: "RẠNG RỠ <br> SẮC ĐỎ", 
        desc: "Chào mừng kỷ niệm ngày Quốc khánh 2/9, không chỉ là dịp để nghỉ ngơi, đây còn là thời điểm tuyệt vời để chúng ta thể hiện lòng tự hào dân tộc qua những sản phẩm cá nhân hóa độc đáo. PRINTORY chính thức khởi động chiến dịch ưu đãi lớn nhất mùa Thu, giúp bạn nhuộm đỏ không gian sống và phong cách thời trang bằng tinh thần Việt Nam.", 
        bg: "#B40000", 
        bgRight: "#B40000",
        link: "PrintoryBlogDetail14.html"  
    },
    { 
        image: "images/Tainguyen/blog_ngay16.jpg", 
        date: "DIỄN RA TỪ 25/8 – 10/9/2025", 
        title: "THẾ GIỚI TRẺ THƠ <br> RỰC RỠ SẮC MÀU", 
        desc: "Hòa chung không khí rộn ràng của ngày Tết Thiếu nhi, Printory chính thức khởi động chiến dịch đặc biệt mang tên Thế Giới Trẻ Thơ  Rực Rỡ Sắc Màu. Đây là món quà ý nghĩa mà chúng tôi muốn gửi gắm đến các thiên thần nhỏ, giúp các em tự do thể hiện cá tính và lưu giữ những khoảnh khắc tuổi thơ tuyệt vời nhất.", 
        bg: "#D2A679", 
        bgRight: "#D2A679",
        link: "PrintoryBlogDetail15.html"  
    }
];

let current = 0;
const productImg = document.getElementById('product-img');
const title = document.getElementById('title');
const desc = document.getElementById('description');
const dateRange = document.getElementById('date-range');
const bgLeft = document.getElementById('bg-left');
const bgRight = document.getElementById('bg-right');
const dots = document.querySelectorAll('.dot');
const viewBtn = document.querySelector('.btn-view');
viewBtn.addEventListener('click', function() {
    const targetLink = slides[current].link;
    window.location.href = targetLink;
});
function updateSlide(index) {
    current = index;
    const s = slides[current];
    productImg.style.opacity = '0';
    setTimeout(() => {
        productImg.src = s.image;
        productImg.style.opacity = '1';
        bgLeft.style.backgroundColor = s.bg;
        bgRight.style.backgroundColor = s.bgRight;
        title.innerHTML = s.title;
        desc.innerText = s.desc;
        dateRange.innerText = s.date;
        [title, desc, dateRange].forEach(el => {
            el.classList.remove('text-animate');
            void el.offsetWidth; 
            el.classList.add('text-animate');
        });
    }, 300);
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

function nextSlide() { 
    current = (current + 1) % slides.length; 
    updateSlide(current); 
    resetAuto(); 
}

function goToSlide(index) { 
    updateSlide(index); 
    resetAuto(); 
}

let timer = setInterval(nextSlide, 5000);

function resetAuto() { 
    clearInterval(timer); 
    timer = setInterval(nextSlide, 5000); 
}

document.querySelectorAll('.toggle-posts').forEach(button => {
    button.addEventListener('click', function() {
        const postGrid = this.closest('.category-header').nextElementSibling;
        const extraPosts = postGrid.querySelectorAll('.extra-post');
        
        if (extraPosts.length === 0) return;

        const isHidden = extraPosts[0].style.display === 'none';

        if (isHidden) {
            extraPosts.forEach(post => {
                post.style.display = 'flex';
                post.classList.add('text-animate');
            });
            this.innerText = 'RÚT GỌN TẤT CẢ BÀI VIẾT';
        } else {
            extraPosts.forEach(post => {
                post.style.display = 'none';
                post.classList.remove('text-animate');
            });
            this.innerText = 'XEM TẤT CẢ BÀI VIẾT';
            this.closest('.category-header').scrollIntoView({ behavior: 'smooth' });
        }
    });
});