/**
 * ==============================================================================
 * DUCAI.VN - CLIENT LOGIC & CONVERSION ENGINE
 * Tối ưu hóa chuyển đổi, kiểm tra số điện thoại, gửi Google Sheets và chuyển tiếp Zalo
 * Hoàn toàn loại bỏ đồ họa 3D giả lập đồ chơi, tập trung vào hiệu suất cao và sự chuyên nghiệp
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Khởi tạo Scroll Reveal xuất hiện mượt mà
  initScrollReveals();

  // 2. Khởi tạo đồng hồ đếm ngược ưu đãi
  initCountdownTimer();

  // 3. Xử lý Form Thu Lead & Chuyển tiếp Zalo
  initLeadFormFlow();

  // 4. Khởi tạo Accordion FAQ
  initFAQ();

  // 5. Đồng bộ cấu hình từ config.js
  applyConfig();

  // 6. Xử lý tương tác video mockup trên điện thoại
  initVideoMockupInteraction();
});

/**
 * Hiệu ứng xuất hiện mượt mà khi cuộn trang (Apple Scroll Reveal)
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Đồng hồ đếm ngược ưu đãi
 */
function initCountdownTimer() {
  const minsEl = document.getElementById('count-mins');
  const secsEl = document.getElementById('count-secs');

  let targetTime = localStorage.getItem('ducai_countdown_target');
  const now = new Date().getTime();

  if (!targetTime || parseInt(targetTime) < now) {
    targetTime = now + (15 * 60 * 1000);
    localStorage.setItem('ducai_countdown_target', targetTime);
  }

  function tick() {
    const current = new Date().getTime();
    const diff = parseInt(targetTime) - current;

    if (diff <= 0) {
      targetTime = current + (15 * 60 * 1000);
      localStorage.setItem('ducai_countdown_target', targetTime);
      return;
    }

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (minsEl) minsEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    if (secsEl) secsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
  }

  tick();
  setInterval(tick, 1000);
}

/**
 * Xử lý nộp Form và chuyển tiếp vào Zalo
 */
function initLeadFormFlow() {
  const form = document.getElementById('lead-form-hero');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('[name="fullname"]');
    const phoneInput = form.querySelector('[name="phone"]');
    const emailInput = form.querySelector('[name="email"]');
    const goalInput = form.querySelector('[name="goal"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    const fullName = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const goal = goalInput ? goalInput.value : 'Chưa chọn';

    const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
    if (!fullName) {
      alert('Vui lòng nhập Họ và Tên của bạn!');
      nameInput.focus();
      return;
    }

    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      alert('Số điện thoại không đúng định dạng (Ví dụ: 0988888888)');
      phoneInput.focus();
      return;
    }

    // Hiệu ứng nút bấm đang kết nối
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      ĐANG KẾT NỐI VÀO ZALO...
    `;

    const leadData = {
      fullName,
      phone,
      email,
      goal,
      device: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
      source: 'Landing Page ducai.vn - Prestige Edition',
      submittedAt: new Date().toISOString()
    };

    // Backup LocalStorage
    try {
      const list = JSON.parse(localStorage.getItem('ducai_leads_backup') || '[]');
      list.push(leadData);
      localStorage.setItem('ducai_leads_backup', JSON.stringify(list));
    } catch (err) {}

    // Gửi Google Sheets Webhook
    if (window.CONFIG && CONFIG.integrations && CONFIG.integrations.googleSheetWebhookUrl &&
        !CONFIG.integrations.googleSheetWebhookUrl.includes('YOUR_SCRIPT_ID')) {
      fetch(CONFIG.integrations.googleSheetWebhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      }).catch(() => {});
    }

    // Mở màn hình Gateway và chuyển hướng Zalo
    openZaloGateway();
  });
}

function openZaloGateway() {
  const modal = document.getElementById('gateway-modal');
  const targetBtn = document.getElementById('btn-gateway-zalo');
  const zaloUrl = (window.CONFIG && CONFIG.zalo && CONFIG.zalo.redirectUrl)
    ? CONFIG.zalo.redirectUrl
    : 'https://zaloapp.com/qr/g/kaf6kdwdrnpi8k2g8zn0?src=qr';

  if (targetBtn) targetBtn.href = zaloUrl;
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  // Tự động chuyển hướng sau 1.2 giây
  setTimeout(() => {
    window.location.href = zaloUrl;
  }, 1200);
}

/**
 * Tương tác video mockup trên điện thoại (Tăng tính chân thực)
 */
function initVideoMockupInteraction() {
  const phoneScreen = document.querySelector('.phone-screen-content');
  const heartCounter = document.querySelector('.tiktok-heart-count');
  if (!phoneScreen || !heartCounter) return;

  let liked = false;
  let count = 1200000;

  phoneScreen.addEventListener('click', () => {
    liked = !liked;
    const heartIcon = document.querySelector('.tiktok-heart-icon');
    if (liked) {
      count += 1;
      if (heartIcon) heartIcon.style.color = '#ef4444';
    } else {
      count -= 1;
      if (heartIcon) heartIcon.style.color = '#ffffff';
    }
    heartCounter.textContent = (count / 1000000).toFixed(1) + 'M';
  });
}

/**
 * Accordion FAQ
 */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

/**
 * Đồng bộ config
 */
function applyConfig() {
  if (typeof CONFIG === 'undefined') return;
  document.querySelectorAll('.brand-phone').forEach(el => {
    el.textContent = CONFIG.brand.phone;
    if (el.tagName === 'A') el.href = `tel:${CONFIG.brand.phoneClean}`;
  });
}
