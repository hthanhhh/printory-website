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
    const helpfulButtons = document.querySelectorAll('.helpful-btn');
    const cancelOrderButtons = document.querySelectorAll('.btn-cancel');
    const reorderButtons = document.querySelectorAll('.btn-reorder');
    const trackButtons = document.querySelectorAll('.btn-track');
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    // ===== HIỆU ỨNG TAB LỌC ĐƠN HÀNG =====
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
            filterOrders(filter);
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
    reviewButtons.forEach(button => {
        button.addEventListener('click', function() {
            openReviewModal();
            
            // Hiệu ứng button click
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    function openReviewModal() {
        reviewModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Reset stars
        resetStars();
        
        // Reset textarea
        const reviewText = document.getElementById('reviewText');
        if (reviewText) {
            reviewText.value = '';
        }
    }

    function closeReviewModal() {
        reviewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
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
    }

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            const parentStars = this.parentElement;
            const allStars = parentStars.querySelectorAll('.star');
            
            // Đặt rating cho parent element
            parentStars.setAttribute('data-rating', value);
            
            // Cập nhật trạng thái stars
            allStars.forEach((s, index) => {
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
            const allStars = parentStars.querySelectorAll('.star');
            
            allStars.forEach((s, index) => {
                if (index < value) {
                    s.style.color = '#ffcc00';
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            const parentStars = this.parentElement;
            const allStars = parentStars.querySelectorAll('.star');
            const currentRating = parseInt(parentStars.getAttribute('data-rating')) || 0;
            
            allStars.forEach((s, index) => {
                if (index >= currentRating) {
                    s.style.color = '#d9d9d9';
                }
            });
        });
    });

    // ===== GỬI ĐÁNH GIÁ =====
    if (submitReviewBtn) {
        submitReviewBtn.addEventListener('click', function() {
            const reviewText = document.getElementById('reviewText').value.trim();
            const starRatings = document.querySelectorAll('.stars[data-rating]');
            
            // Kiểm tra đánh giá
            let hasRating = false;
            let totalRating = 0;
            let ratingCount = 0;
            
            starRatings.forEach(stars => {
                const rating = parseInt(stars.getAttribute('data-rating')) || 0;
                if (rating > 0) {
                    hasRating = true;
                    totalRating += rating;
                    ratingCount++;
                }
            });
            
            if (!hasRating) {
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
                // Thêm đánh giá mới vào danh sách
                addNewReview(reviewText, Math.round(totalRating / ratingCount));
                
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
            }, 1500);
            
            // Hiệu ứng button click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    }

    function addNewReview(text, rating) {
        const reviewsGrid = document.querySelector('.reviews-grid');
        const newReview = document.createElement('div');
        newReview.className = 'review-card';
        
        // Tạo HTML cho đánh giá mới
        newReview.innerHTML = `
            <div class="review-header">
                <div class="review-product">
                    <div class="img-box small">
                        <img src="images/products/Áo hoodie đen Unisex.png" alt="Hoodie">
                    </div>
                    <div>
                        <h4>Hoodie Unisex - "Urban Street"</h4>
                        <p class="review-date">Đánh giá ngày: ${getCurrentDate()}</p>
                    </div>
                </div>
                <div class="review-rating">
                    <div class="star-rating">
                        ${'<span class="filled">★</span>'.repeat(rating)}${'<span>★</span>'.repeat(5 - rating)}
                    </div>
                    <span class="rating-text">${rating}/5</span>
                </div>
            </div>
            <div class="review-body">
                <p>${text}</p>
            </div>
            <div class="review-helpful">
                <span>Đánh giá này có hữu ích?</span>
                <button class="helpful-btn">
                    <i class="fas fa-thumbs-up"></i> Có (0)
                </button>
                <button class="helpful-btn">
                    <i class="fas fa-thumbs-down"></i> Không (0)
                </button>
            </div>
        `;
        
        // Thêm vào đầu danh sách
        reviewsGrid.insertBefore(newReview, reviewsGrid.firstChild);
        
        // Thêm sự kiện cho nút helpful mới
        newReview.querySelectorAll('.helpful-btn').forEach(button => {
            button.addEventListener('click', handleHelpfulClick);
        });
        
        // Hiệu ứng thêm mới
        newReview.style.opacity = '0';
        newReview.style.transform = 'translateY(20px)';
        setTimeout(() => {
            newReview.style.opacity = '1';
            newReview.style.transform = 'translateY(0)';
        }, 50);
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
            showNotification('Sản phẩm đã được thêm vào giỏ hàng!');
            
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
            showNotification('Đang mở trang theo dõi đơn hàng...');
            
            // Hiệu ứng button click
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // ===== NÚT HỮU ÍCH =====
    function handleHelpfulClick() {
        const icon = this.querySelector('i');
        const text = this.textContent;
        const countMatch = text.match(/\((\d+)\)/);
        
        if (countMatch) {
            const currentCount = parseInt(countMatch[1]);
            const newCount = currentCount + 1;
            this.innerHTML = `${icon.outerHTML} ${text.replace(/\(\d+\)/, `(${newCount})`)}`;
        }
        
        // Hiệu ứng button click
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
        
        // Thông báo
        const action = text.includes('Có') ? 'có ích' : 'không hữu ích';
        showNotification(`Cảm ơn bạn đã bình chọn đánh giá này ${action}!`);
    }

    helpfulButtons.forEach(button => {
        button.addEventListener('click', handleHelpfulClick);
    });

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
            this.style.transform = 'translateY(2px)';
            this.style.boxShadow = '0 2px 0 #b35f00';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 0 #b35f00';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '0 4px 0 #b35f00';
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
});
