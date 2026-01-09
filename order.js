// ===== ORDER PAGE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // ===== KHỞI TẠO BIẾN =====
    const orderTabs = document.querySelectorAll('.order-tab');
    const orderCards = document.querySelectorAll('.order-card');
    const reviewModal = document.getElementById('reviewModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelReviewBtn = document.querySelector('.btn-cancel-review');
    const reviewButtons = document.querySelectorAll('.btn-review');
    const stars = document.querySelectorAll('.star');
    const submitReviewBtn = document.querySelector('.btn-submit-review');
    const cancelOrderButtons = document.querySelectorAll('.btn-cancel');
    const reorderButtons = document.querySelectorAll('.btn-reorder');
    const trackButtons = document.querySelectorAll('.btn-track');
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const reviewsSection = document.getElementById('reviewsSection');
    const reviewsGrid = document.querySelector('.reviews-grid');

    // ===== DỮ LIỆU ĐÁNH GIÁ ĐÃ GỬI (QUÁ KHỨ) =====
    const pastReviews = [
        {
            id: 1,
            orderId: "PRT20231015001",
            orderDate: "15/10/2023",
            productName: "Áo thun Cotton - 'Ocean Wave'",
            productImage: "images/products/Áo thun xanh pastel Unisex.png",
            reviewDate: "20/10/2023",
            rating: 5,
            quality: 5,
            printing: 4,
            durability: 5,
            comment: "Áo rất đẹp, chất liệu cotton mềm mại, thoáng mát. Hình in rõ nét, màu sắc tươi tắn. Đã giặt nhiều lần vẫn không phai màu. Sẽ mua thêm!",
            helpful: 42,
            notHelpful: 2
        },
        {
            id: 2,
            orderId: "PRT20230910001",
            orderDate: "10/09/2023",
            productName: "Tote Bag Canvas - 'Minimalist'",
            productImage: "images/products/Túi tote trắng basic.png",
            reviewDate: "18/09/2023",
            rating: 4,
            quality: 4,
            printing: 5,
            durability: 4,
            comment: "Túi chất lượng tốt, vải dày dặn, đường may chắc chắn. Hình in đơn giản nhưng đẹp. Size vừa đủ đựng laptop 13 inch và các vật dụng cá nhân.",
            helpful: 28,
            notHelpful: 1
        },
        {
            id: 3,
            orderId: "PRT20230805001",
            orderDate: "05/08/2023",
            productName: "Cốc sứ in hình - 'Morning Coffee'",
            productImage: "images/products/Cốc trắng basic.png",
            reviewDate: "12/08/2023",
            rating: 5,
            quality: 5,
            printing: 5,
            durability: 5,
            comment: "Cốc rất đẹp, chất liệu sứ cao cấp, dày dặn. Hình in sống động, rõ nét. Dung tích 400ml vừa đủ cho 1 ly cà phê buổi sáng. Đóng gói cẩn thận.",
            helpful: 35,
            notHelpful: 0
        },
        {
            id: 4,
            orderId: "PRT20230720001",
            orderDate: "20/07/2023",
            productName: "Hoodie Unisex - 'Street Style'",
            productImage: "images/products/Áo hoodie xám Unisex.png",
            reviewDate: "28/07/2023",
            rating: 4,
            quality: 4,
            printing: 4,
            durability: 5,
            comment: "Áo hoodie ấm áp, chất liệu tốt. Form áo chuẩn, mặc rất đẹp. Hình in không bong tróc sau nhiều lần giặt. Màu sắc giống hình 100%.",
            helpful: 31,
            notHelpful: 3
        }
    ];

    // ===== DỮ LIỆU ĐƠN HÀNG HIỆN TẠI =====
    const currentOrders = [
        {
            orderId: "PRT20240115001",
            date: "15/01/2024",
            status: "processing",
            productName: "Áo thun Cotton - Thiết kế 'Mặt trăng'",
            productImage: "images/products/Áo thun đen Unisex.png",
            size: "L",
            color: "Đen",
            quantity: 1,
            price: 249000
        },
        {
            orderId: "PRT20240110001",
            date: "10/01/2024",
            status: "shipping",
            items: [
                {
                    name: "Tote Bag Canvas - 'Forest Adventure'",
                    image: "images/products/Túi tote đen basic.png",
                    color: "Xanh rêu",
                    quantity: 2,
                    price: 189000
                },
                {
                    name: "Cốc sứ in hình - 'Coffee Lover'",
                    image: "images/products/Cốc trắng basic.png",
                    type: "Cốc 400ml",
                    quantity: 1,
                    price: 129000
                }
            ]
        },
        {
            orderId: "PRT20231215001",
            date: "15/12/2023",
            status: "delivered",
            productName: "Hoodie Unisex - 'Urban Street'",
            productImage: "images/products/Áo hoodie đen Unisex.png",
            size: "M",
            color: "Xám",
            quantity: 1,
            price: 389000
        },
        {
            orderId: "PRT20231120001",
            date: "20/11/2023",
            status: "delivered",
            productName: "Áo thun Cotton - 'Minimalist Design'",
            productImage: "images/products/Áo thun trắng Unisex.png",
            size: "XL",
            color: "Trắng",
            quantity: 1,
            price: 220000
        }
    ];

    // ===== HIỆN THỊ ĐÁNH GIÁ ĐÃ GỬI =====
    function displayPastReviews() {
        reviewsGrid.innerHTML = '';
        
        pastReviews.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';
            reviewCard.innerHTML = `
                <div class="review-header">
                    <div class="review-product">
                        <div class="img-box small">
                            <img src="${review.productImage}" alt="${review.productName}">
                        </div>
                        <div>
                            <h4>${review.productName}</h4>
                            <p class="review-date">Mua ngày: ${review.orderDate} | Đánh giá: ${review.reviewDate}</p>
                        </div>
                    </div>
                    <div class="review-rating">
                        <div class="star-rating">
                            ${'<span class="filled">★</span>'.repeat(review.rating)}${'<span>★</span>'.repeat(5 - review.rating)}
                        </div>
                        <span class="rating-text">${review.rating}/5</span>
                    </div>
                </div>
                <div class="review-body">
                    <div class="rating-details">
                        <span>Chất lượng: ${review.quality}/5</span>
                        <span>In ấn: ${review.printing}/5</span>
                        <span>Độ bền: ${review.durability}/5</span>
                    </div>
                    <p>${review.comment}</p>
                </div>
                <div class="review-helpful">
                    <span>Đánh giá này có hữu ích?</span>
                    <button class="helpful-btn" data-review-id="${review.id}" data-type="helpful">
                        <i class="fas fa-thumbs-up"></i> Có (${review.helpful})
                    </button>
                    <button class="helpful-btn" data-review-id="${review.id}" data-type="not-helpful">
                        <i class="fas fa-thumbs-down"></i> Không (${review.notHelpful})
                    </button>
                </div>
            `;
            
            reviewsGrid.appendChild(reviewCard);
        });
        
        // Thêm sự kiện cho nút helpful
        document.querySelectorAll('.helpful-btn').forEach(button => {
            button.addEventListener('click', handleHelpfulClick);
        });
    }

    // ===== HIỆU ỨNG TAB LỌC ĐƠN HÀNG =====
    let currentFilter = 'all';
    
    orderTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Xóa active class từ tất cả tabs
            orderTabs.forEach(t => t.classList.remove('active'));
            
            // Thêm active class cho tab được click
            this.classList.add('active');
            
            // Hiệu ứng click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Lọc đơn hàng
            const filter = this.getAttribute('data-filter');
            currentFilter = filter;
            filterOrders(filter);
            
            // Hiển thị/ẩn phần đánh giá đã gửi
            if (filter === 'delivered') {
                reviewsSection.style.display = 'block';
                displayPastReviews();
            } else {
                reviewsSection.style.display = 'none';
            }
        });
    });

    function filterOrders(filter) {
        orderCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                const status = card.getAttribute('data-status');
                
                if (status === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    }

    // ===== HIỆU ỨNG HOVER CHO ORDER CARD =====
    orderCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.5)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.4)';
        });
    });

    // ===== MODAL ĐÁNH GIÁ =====
    let currentReviewOrder = null;
    let currentReviewProduct = null;
    let currentReviewImage = null;

    reviewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.getAttribute('data-order-id');
            const orderCard = this.closest('.order-card');
            const productName = orderCard.querySelector('.item-name').textContent;
            const productImage = orderCard.querySelector('.img-box img').src;
            
            currentReviewOrder = orderId;
            currentReviewProduct = productName;
            currentReviewImage = productImage;
            
            openReviewModal(orderId, productName, productImage);
            
            // Hiệu ứng button click
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    function openReviewModal(orderId, productName, productImage) {
        // Cập nhật thông tin sản phẩm trong modal
        document.getElementById('modal-product-img').src = productImage;
        document.getElementById('modal-product-name').textContent = productName;
        document.getElementById('modal-order-id').textContent = `Mã đơn: #${orderId}`;
        
        // Reset form
        resetStars();
        document.getElementById('reviewText').value = '';
        
        // Hiển thị modal
        reviewModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeReviewModal() {
        reviewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        currentReviewOrder = null;
        currentReviewProduct = null;
        currentReviewImage = null;
    }

    // Đóng modal khi click nút đóng
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeReviewModal);
    }

    // Đóng modal khi click nút hủy
    if (cancelReviewBtn) {
        cancelReviewBtn.addEventListener('click', closeReviewModal);
    }

    // Đóng modal khi click ra ngoài
    reviewModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeReviewModal();
        }
    });

    // ===== HỆ THỐNG ĐÁNH GIÁ SAO =====
    function resetStars() {
        stars.forEach(star => {
            star.classList.remove('active');
            star.style.color = '#d9d9d9';
        });
        
        // Reset data-rating
        document.querySelectorAll('.stars').forEach(stars => {
            stars.setAttribute('data-rating', '0');
        });
    }

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            const parentStars = this.parentElement;
            const type = parentStars.getAttribute('data-type');
            
            // Đặt rating cho parent element
            parentStars.setAttribute('data-rating', value);
            
            // Cập nhật trạng thái stars trong nhóm này
            const allStarsInGroup = parentStars.querySelectorAll('.star');
            allStarsInGroup.forEach((s, index) => {
                if (index < value) {
                    s.classList.add('active');
                    s.style.color = '#fa8501';
                } else {
                    s.classList.remove('active');
                    s.style.color = '#d9d9d9';
                }
            });
            
            // Hiệu ứng cho sao được click
            this.style.transform = 'scale(1.5)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
        
        star.addEventListener('mouseover', function() {
            const value = parseInt(this.getAttribute('data-value'));
            const parentStars = this.parentElement;
            const allStarsInGroup = parentStars.querySelectorAll('.star');
            
            allStarsInGroup.forEach((s, index) => {
                if (index < value) {
                    s.style.color = '#ffcc00';
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            const parentStars = this.parentElement;
            const allStarsInGroup = parentStars.querySelectorAll('.star');
            const currentRating = parseInt(parentStars.getAttribute('data-rating')) || 0;
            
            allStarsInGroup.forEach((s, index) => {
                if (index >= currentRating) {
                    s.style.color = '#d9d9d9';
                }
            });
        });
    });

    // ===== GỬI ĐÁNH GIÁ MỚI =====
    if (submitReviewBtn) {
        submitReviewBtn.addEventListener('click', function() {
            const reviewText = document.getElementById('reviewText').value.trim();
            const starGroups = document.querySelectorAll('.stars');
            
            // Lấy rating từ các nhóm sao
            const qualityRating = parseInt(document.querySelector('.stars[data-type="quality"]').getAttribute('data-rating')) || 0;
            const printingRating = parseInt(document.querySelector('.stars[data-type="printing"]').getAttribute('data-rating')) || 0;
            const durabilityRating = parseInt(document.querySelector('.stars[data-type="durability"]').getAttribute('data-rating')) || 0;
            
            const averageRating = Math.round((qualityRating + printingRating + durabilityRating) / 3);
            
            // Kiểm tra đánh giá
            if (averageRating === 0) {
                showNotification('Vui lòng chọn ít nhất 1 sao để đánh giá!');
                return;
            }
            
            if (reviewText.length < 10) {
                showNotification('Vui lòng nhập đánh giá ít nhất 10 ký tự!');
                return;
            }
            
            // Hiệu ứng loading
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
            this.disabled = true;
            
            // Mô phỏng gửi dữ liệu
            setTimeout(() => {
                // Thêm đánh giá mới vào danh sách đánh giá đã gửi
                const newReview = {
                    id: pastReviews.length + 1,
                    orderId: currentReviewOrder,
                    orderDate: getCurrentDate(),
                    productName: currentReviewProduct,
                    productImage: currentReviewImage,
                    reviewDate: getCurrentDate(),
                    rating: averageRating,
                    quality: qualityRating,
                    printing: printingRating,
                    durability: durabilityRating,
                    comment: reviewText,
                    helpful: 0,
                    notHelpful: 0
                };
                
                pastReviews.unshift(newReview); // Thêm vào đầu mảng
                
                // Nếu đang xem tab "Đã giao", cập nhật lại danh sách đánh giá
                if (currentFilter === 'delivered') {
                    displayPastReviews();
                }
                
                // Thông báo thành công
                showNotification('Cảm ơn bạn đã đánh giá! Đánh giá của bạn đã được ghi nhận.');
                
                // Reset form
                resetStars();
                document.getElementById('reviewText').value = '';
                
                // Reset button
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Đóng modal
                closeReviewModal();
                
                // Cập nhật nút "Đánh giá" thành "Đã đánh giá"
                updateReviewButton(currentReviewOrder);
                
            }, 1500);
            
            // Hiệu ứng button click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    }

    function updateReviewButton(orderId) {
        // Tìm nút đánh giá của đơn hàng tương ứng và cập nhật
        document.querySelectorAll('.btn-review').forEach(button => {
            if (button.getAttribute('data-order-id') === orderId) {
                button.innerHTML = '<i class="fas fa-check"></i> Đã đánh giá';
                button.disabled = true;
                button.style.opacity = '0.7';
                button.style.cursor = 'not-allowed';
            }
        });
    }

    function getCurrentDate() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // ===== NÚT HỦY ĐƠN HÀNG =====
    cancelOrderButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
                const orderCard = this.closest('.order-card');
                
                // Hiệu ứng loading
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang hủy...';
                this.disabled = true;
                
                setTimeout(() => {
                    // Thay đổi trạng thái đơn hàng
                    orderCard.setAttribute('data-status', 'cancelled');
                    
                    // Cập nhật giao diện
                    const statusBadge = orderCard.querySelector('.order-status');
                    statusBadge.className = 'order-status status-cancelled';
                    statusBadge.innerHTML = '<i class="fas fa-times-circle"></i> Đã hủy';
                    
                    // Ẩn các nút không cần thiết
                    this.style.display = 'none';
                    const trackBtn = orderCard.querySelector('.btn-track');
                    if (trackBtn) trackBtn.style.display = 'none';
                    const reviewBtn = orderCard.querySelector('.btn-review');
                    if (reviewBtn) reviewBtn.style.display = 'none';
                    
                    // Thông báo thành công
                    showNotification('Đơn hàng đã được hủy thành công!');
                    
                    // Reset button
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 1000);
            }
        });
    });

    // ===== NÚT MUA LẠI =====
    reorderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderCard = this.closest('.order-card');
            const productName = orderCard.querySelector('.item-name').textContent;
            
            showNotification(`Đã thêm "${productName}" vào giỏ hàng!`);
            
            // Hiệu ứng button click
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // ===== NÚT THEO DÕI =====
    trackButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderCard = this.closest('.order-card');
            const orderId = orderCard.querySelector('.order-id strong').textContent;
            
            showNotification(`Mở trang theo dõi đơn hàng ${orderId}...`);
            
            // Hiệu ứng button click
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // ===== NÚT HỮU ÍCH =====
    function handleHelpfulClick() {
        const reviewId = parseInt(this.getAttribute('data-review-id'));
        const type = this.getAttribute('data-type');
        const text = this.textContent;
        const countMatch = text.match(/\((\d+)\)/);
        
        if (countMatch) {
            const currentCount = parseInt(countMatch[1]);
            const newCount = currentCount + 1;
            this.innerHTML = this.innerHTML.replace(/\(\d+\)/, `(${newCount})`);
            
            // Cập nhật dữ liệu
            const reviewIndex = pastReviews.findIndex(r => r.id === reviewId);
            if (reviewIndex !== -1) {
                if (type === 'helpful') {
                    pastReviews[reviewIndex].helpful = newCount;
                } else {
                    pastReviews[reviewIndex].notHelpful = newCount;
                }
            }
        }
        
        // Hiệu ứng button click
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
        
        // Thông báo
        const action = type === 'helpful' ? 'có ích' : 'không hữu ích';
        showNotification(`Cảm ơn bạn đã bình chọn đánh giá này ${action}!`);
    }

    // ===== TÌM KIẾM =====
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            searchInput.focus();
            searchInput.style.transform = 'scale(1.05)';
            setTimeout(() => {
                searchInput.style.transform = 'scale(1)';
            }, 300);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    searchOrders(query);
                }
            }
        });
    }

    function searchOrders(query) {
        let found = false;
        orderCards.forEach(card => {
            const orderId = card.querySelector('.order-id strong').textContent;
            const orderItems = card.querySelectorAll('.item-name');
            
            let match = orderId.toLowerCase().includes(query.toLowerCase());
            orderItems.forEach(item => {
                if (item.textContent.toLowerCase().includes(query.toLowerCase())) {
                    match = true;
                }
            });
            
            if (match) {
                card.style.backgroundColor = 'rgba(250, 133, 1, 0.1)';
                card.style.borderColor = '#fa8501';
                found = true;
                
                // Cuộn đến đơn hàng tìm thấy
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                card.style.backgroundColor = '';
                card.style.borderColor = '';
            }
        });
        
        if (!found) {
            showNotification('Không tìm thấy đơn hàng phù hợp');
        }
    }

    // ===== HIỆU ỨNG BUTTON CHUNG =====
    const orderButtons = document.querySelectorAll('.order-btn');
    orderButtons.forEach(button => {
        button.addEventListener('mousedown', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(2px)';
                this.style.boxShadow = '0 2px 0 #b35f00';
            }
        });
        
        button.addEventListener('mouseup', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 6px 0 #b35f00';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = '';
                this.style.boxShadow = '0 4px 0 #b35f00';
            }
        });
    });

    // ===== HIỆU ỨNG NAV LINK =====
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                showNotification('Tính năng đang phát triển');
            }
        });
    });

    // ===== THÔNG BÁO =====
    function showNotification(message) {
        // Tạo notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #249dbc, #1a7a94);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 9999;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            font-family: 'Baloo Thambi 2', sans-serif;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Hiệu ứng hiện lên
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Tự động ẩn sau 3 giây
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // ===== KHỞI TẠO BAN ĐẦU =====
    console.log('Order page loaded successfully!');
    
    // Hiển thị tất cả đơn hàng ban đầu
    filterOrders('all');
    
    // Thêm hiệu ứng cho user avatar
    const userAvatar = document.querySelector('.user-avatar');
    if (userAvatar) {
        userAvatar.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(15deg) scale(1.1)';
        });
        
        userAvatar.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    }
    
    // Thêm CSS cho rating details
    const style = document.createElement('style');
    style.textContent = `
        .rating-details {
            display: flex;
            gap: 15px;
            margin-bottom: 10px;
            font-family: 'Baloo Thambi 2', sans-serif;
            color: #b1d9ec;
            font-size: 14px;
        }
        
        .rating-details span {
            background: rgba(36, 157, 188, 0.1);
            padding: 5px 10px;
            border-radius: 10px;
            border: 1px solid rgba(36, 157, 188, 0.3);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .review-card {
            animation: fadeIn 0.5s ease;
        }
    `;
    document.head.appendChild(style);
});
