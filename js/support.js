// Support Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all other FAQ items
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('show');
            });
            
            // If this wasn't active, open it
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('show');
            }
        });
    });
    
    // Form submission với hiệu ứng giống preview
    const supportForm = document.getElementById('supportForm');
    
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const topic = document.getElementById('topic').value;
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !topic || !message) {
                showToast('Vui lòng điền đầy đủ các trường bắt buộc (*)', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showToast('Vui lòng nhập địa chỉ email hợp lệ', 'error');
                return;
            }
            
            // Simulate form submission với hiệu ứng giống preview
            const submitBtn = supportForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
            submitBtn.disabled = true;
            submitBtn.style.transform = 'translateY(0)';
            submitBtn.style.boxShadow = 'none';
            
            // Simulate API call
            setTimeout(() => {
                // In a real application, you would send the form data to your server here
                console.log('Form submitted:', {
                    name,
                    email,
                    orderNumber: document.getElementById('orderNumber').value.trim(),
                    topic,
                    message
                });
                
                // Show success message với toast giống preview
                showToast('✅ Tin nhắn của bạn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm nhất.');
                
                // Reset form
                supportForm.reset();
                
                // Reset button với hiệu ứng
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.transform = '';
                    submitBtn.style.boxShadow = '';
                }, 1000);
                
            }, 1500);
        });
    }
    
    // Email validation helper function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Toast notification function giống preview
    function showToast(message, type = 'success') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast ${type === 'error' ? 'error' : ''}`;
        toast.innerHTML = `<span>${message}</span>`;
        
        // Add styles
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            padding: 15px 20px;
            background: linear-gradient(145deg, #4caf50, #2e7d32);
            color: white;
            border-radius: 10px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            transform: translateX(400px);
            opacity: 0;
            transition: all 0.4s ease;
            font-family: 'Baloo Thambi 2', cursive;
        `;
        
        if (type === 'error') {
            toast.style.background = 'linear-gradient(145deg, #f44336, #c62828)';
        }
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(400px)';
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 400);
        }, 3000);
    }
    
    // Search functionality for FAQ
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                filterFAQs(searchTerm);
            } else {
                // Reset all FAQs
                const faqItems = document.querySelectorAll('.faq-item');
                faqItems.forEach(item => {
                    item.style.display = 'block';
                    item.querySelector('.faq-question').classList.remove('active');
                    item.querySelector('.faq-answer').classList.remove('show');
                });
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    filterFAQs(searchTerm);
                }
            }
        });
    }
    
    function filterFAQs(searchTerm) {
        const faqItems = document.querySelectorAll('.faq-item');
        let foundResults = false;
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
            const searchLower = searchTerm.toLowerCase();
            
            if (question.includes(searchLower) || answer.includes(searchLower)) {
                item.style.display = 'block';
                // Open the matching FAQ item
                item.querySelector('.faq-question').classList.add('active');
                item.querySelector('.faq-answer').classList.add('show');
                foundResults = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show message if no results found
        if (!foundResults) {
            showToast(`Không tìm thấy kết quả cho "${searchTerm}"`, 'error');
            // Show all FAQs again after 2 seconds
            setTimeout(() => {
                faqItems.forEach(item => {
                    item.style.display = 'block';
                    item.querySelector('.faq-question').classList.remove('active');
                    item.querySelector('.faq-answer').classList.remove('show');
                });
            }, 2000);
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});