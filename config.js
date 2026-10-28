/**
 * ==============================================================================
 * CẤU HÌNH TRUNG TÂM LANDING PAGE - DUCAI.VN
 * ==============================================================================
 * Anh Đức chỉ cần chỉnh sửa các thông tin bên dưới, website sẽ tự động cập nhật!
 */

const CONFIG = {
  // 1. THÔNG TIN THƯƠNG HIỆU & GIẢNG VIÊN
  brand: {
    name: "Đức AI",
    domain: "ducai.vn",
    tagline: "Làm Chủ AI - Tạo Hàng Trăm Video Triệu View Tự Động",
    phone: "0988.888.888", // Số điện thoại / Zalo hiển thị trên trang
    phoneClean: "0988888888", // Số điện thoại viết liền không dấu chấm
    email: "contact@ducai.vn",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com/@ducai.vn",
    youtube: "https://youtube.com",
  },

  // 2. CẤU HÌNH ĐIỀU HƯỚNG ZALO (RẤT QUAN TRỌNG)
  zalo: {
    // Link Zalo chính thức của anh Đức
    redirectUrl: "https://zalo.me/g/kaf6kdwdrnpi8k2g8zn0",
    qrCodeImage: "assets/qr-zalo.png", 

    // Thời gian chờ trước khi chuyển trang (mili-giây, 1200ms = 1.2s để khách thấy thông báo thành công)
    redirectDelayMs: 1200,

    // Mở trong tab mới hay chuyển trang hiện tại? 
    // false = chuyển hướng ngay trên tab hiện tại (khuyên dùng trên mobile để không bị chặn popup)
    // true = mở tab mới
    openInNewTab: false,
  },

  // 3. KÊNH NHẬN DỮ LIỆU LEAD (GOOGLE SHEETS & TELEGRAM)
  integrations: {
    // Dán URL Web App của Google Apps Script vào đây (Xem hướng dẫn trong file google-sheets-script.js)
    googleSheetWebhookUrl: "https://script.google.com/macros/s/AKfycbz_YOUR_SCRIPT_ID/exec",

    // Bật thông báo qua Telegram (tùy chọn)
    telegram: {
      enabled: false, // Đổi thành true nếu muốn bật
      botToken: "YOUR_TELEGRAM_BOT_TOKEN",
      chatId: "YOUR_TELEGRAM_CHAT_ID",
    }
  },

  // 4. CẤU HÌNH ƯU ĐÃI & ĐẾM NGƯỢC (TẠO TÍNH KHAN HIẾM - URGENCY)
  countdown: {
    enabled: true,
    // Số phút đếm ngược mỗi phiên (tạo cảm giác sắp hết hạn suất học miễn phí/ưu đãi)
    durationMinutes: 15,
    // Số suất quà tặng còn lại
    remainingSlots: 9,
    // Tổng số suất ban đầu
    totalSlots: 50,
  },

  // 5. CẤU HÌNH POPUP CHÀO MỪNG / EXIT INTENT
  popup: {
    autoShowAfterSeconds: 8, // Tự động bật Popup sau 8 giây nếu khách chưa đăng ký
    showOnExitIntent: true,  // Bật Popup khi khách rê chuột định đóng tab (trên PC)
  }
};

// Export nếu dùng module, hoặc gắn vào window cho trình duyệt
if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}
