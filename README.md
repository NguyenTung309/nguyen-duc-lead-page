# Local source publication

## Repository status

Lead capture website with Google Sheets integration.

This repository contains a filtered local source snapshot. Application builds and end-to-end behavior have not been verified during publication.

Credential files, detected credential values, dependencies, build outputs and large backup archives were excluded. Configure your own services and secrets before running.

---

# 🚀 HƯỚNG DẪN SỬ DỤNG VÀ TRIỂN KHAI LANDING PAGE DUCAI.VN

Chào mừng anh Đức! Đây là toàn bộ mã nguồn **Landing Page Thu Lead Chuyển Đổi Cao** cho Khóa học **Làm Video Bằng AI** (Thương hiệu & tên miền: **ducai.vn**).

---

## 📁 CẤU TRÚC THƯ MỤC DỰ ÁN

```text
web lead nguyễn đức/
├── index.html                  # Giao diện Landing Page chuẩn SEO & CRO
├── config.js                   # Cấu hình trung tâm (Link Zalo, SĐT, Google Sheet,...)
├── google-sheets-script.js     # Mã Google Apps Script tự động lưu Lead vào Google Sheets
├── README.md                   # Tài liệu hướng dẫn sử dụng và triển khai
└── assets/
    ├── css/
    │   └── style.css           # Hiệu ứng AI Dark Theme, Neon glow & Glassmorphism
    └── js/
        └── main.js             # Logic form, validate số điện thoại, đẩy Lead & chuyển hướng Zalo
```

---

## 🎯 1. CÁCH ĐỔI LINK ZALO CÁ NHÂN HOẶC LINK NHÓM ZALO

Mở file **`config.js`** và tìm dòng:

```javascript
zalo: {
  // Thay đổi link này thành link Zalo của anh:
  redirectUrl: "https://zalo.me/g/vip-ducai", // Ví dụ nhóm: https://zalo.me/g/xxxxxx hoặc cá nhân: https://zalo.me/0988888888
  redirectDelayMs: 1200, // Thời gian đợi trước khi nhảy sang Zalo (1.2 giây)
  openInNewTab: false,   // false = chuyển hướng trên tab hiện tại (khuyên dùng cho Mobile)
}
```

Chỉ cần đổi đúng link Zalo tại đây là toàn bộ các form và nút bấm trên website sẽ tự động nhảy vào link Zalo đó!

---

## 📊 2. CÁCH CÀI ĐẶT GOOGLE SHEETS ĐỂ NHẬN LEAD TỰ ĐỘNG (MIỄN PHÍ)

Mỗi khi khách hàng điền Form, dữ liệu (Tên, SĐT, Email, Nhu cầu, Ngày giờ, Thiết bị) sẽ tự động chạy thẳng vào Google Sheet của anh:

1. **Bước 1**: Mở trình duyệt, truy cập [https://sheets.new](https://sheets.new) để tạo 1 file Google Sheets mới.
2. **Bước 2**: Đặt tên file là `LEAD DUCAI.VN`. Tại dòng đầu tiên (Hàng 1), tạo các cột:
   - Cột A: `Thời gian`
   - Cột B: `Họ và tên`
   - Cột C: `Số điện thoại Zalo`
   - Cột D: `Email`
   - Cột E: `Mục tiêu làm video AI`
   - Cột F: `Thiết bị`
   - Cột G: `Nguồn`
3. **Bước 3**: Trên thanh menu Google Sheets, bấm **Tiện ích mở rộng** (Extensions) -> Chọn **Apps Script**.
4. **Bước 4**: Xóa hết mã có sẵn trong Apps Script, mở file `google-sheets-script.js` trong thư mục dự án này, copy toàn bộ nội dung và dán vào.
5. **Bước 5**: Bấm nút **Triển khai** (Deploy) màu xanh góc trên bên phải -> Chọn **Triển khai mới** (New deployment).
   - Chọn loại: **Ứng dụng web** (Web app).
   - Người thực thi: **Tôi** (Me).
   - **Người có quyền truy cập**: Chọn **Bất kỳ ai** (Anyone) -> *Rất quan trọng để website gửi được dữ liệu vào!*
   - Bấm **Triển khai** (Deploy) và cấp quyền cho tài khoản Google của anh.
6. **Bước 6**: Copy link **URL của ứng dụng web** (có đuôi `/exec`).
7. **Bước 7**: Mở file `config.js`, dán link vừa copy vào dòng:
   ```javascript
   googleSheetWebhookUrl: "https://script.google.com/macros/s/AKfy.../exec",
   ```

Xong! Giờ đây mỗi khi có người điền form, Google Sheet sẽ cập nhật ngay lập tức theo thời gian thực.

---

## 🌐 3. HƯỚNG DẪN ĐƯA TRANG LÊN TÊN MIỀN `ducai.vn`

Trang web được xây dựng theo chuẩn tĩnh siêu tốc (Static HTML5/JS), vì vậy anh có thể đưa lên mạng với chi phí **0 ĐỒNG** và tốc độ tải trang cực nhanh:

### Cách 1: Sử dụng Cloudflare Pages hoặc Vercel (Khuyên dùng - Miễn phí 100%, bảo mật SSL xanh)
1. Tạo tài khoản tại [cloudflare.com](https://cloudflare.com) hoặc [vercel.com](https://vercel.com).
2. Kéo thả toàn bộ thư mục `web lead nguyễn đức` lên.
3. Vào phần **Custom Domains** -> Điền tên miền `ducai.vn`.
4. Trỏ bản ghi DNS (CNAME/A record) theo hướng dẫn trên màn hình là xong.

### Cách 2: Sử dụng Hosting / cPanel có sẵn
1. Đăng nhập vào cPanel quản lý hosting của anh.
2. Vào thư mục `public_html`.
3. Nén toàn bộ các file trong thư mục này thành file `.zip`, tải lên `public_html` rồi giải nén ra.
4. Truy cập `https://ducai.vn` để xem thành quả.

---

## 💻 4. CÁCH XEM THỬ NGAY TRÊN MÁY TÍNH

Anh chỉ cần:
- Nhấp đúp chuột trực tiếp vào file **`index.html`** để mở trên trình duyệt Chrome, Safari hoặc Cốc Cốc.
- Hoặc nếu dùng VS Code, anh cài extension **Live Server** rồi bấm `Go Live`.

---

## 🛡️ TÍNH NĂNG ĐẶC BIỆT ĐÃ TÍCH HỢP SẴN:
- **Kiểm tra SĐT Việt Nam**: Tự động chặn các số điện thoại sai định dạng để tránh lead rác.
- **Dự phòng LocalStorage**: Nếu chẳng may mạng chập chờn chưa gửi được sang Google Sheet, lead vẫn được lưu an toàn trong trình duyệt của khách hàng.
- **Tối ưu Mobile 100%**: Hơn 85% người dùng Zalo xem trên điện thoại, thanh Sticky CTA chân màn hình sẽ giúp tối đa hóa số lượt vào Zalo!
