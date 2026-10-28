/**
 * ==============================================================================
 * HƯỚNG DẪN CẤU HÌNH GOOGLE SHEETS TỰ ĐỘNG LƯU LEAD CHO DUCAI.VN
 * ==============================================================================
 * 
 * BƯỚC 1: Tạo một Google Sheet mới tại https://sheets.new
 * - Đặt tên trang tính là: "LEAD DUCAI.VN"
 * - Tại Hàng 1 (Dòng tiêu đề), điền các cột sau:
 *   Cột A: Thời gian
 *   Cột B: Họ và tên
 *   Cột C: Số điện thoại / Zalo
 *   Cột D: Email
 *   Cột E: Mục tiêu làm video AI
 *   Cột F: Thiết bị
 *   Cột G: Nguồn trang
 * 
 * BƯỚC 2: Vào menu "Tiện ích mở rộng" (Extensions) -> Chọn "Apps Script"
 * 
 * BƯỚC 3: Xóa hết mã cũ trong Apps Script và DÁN TOÀN BỘ ĐOẠN CODE DƯỚI ĐÂY VÀO:
 * 
 * BƯỚC 4: Bấm nút "Triển khai" (Deploy) ở góc trên bên phải -> Chọn "Triển khai mới" (New deployment)
 * - Loại triển khai (Select type): Chọn biểu tượng bánh răng ⚙️ -> Chọn "Ứng dụng web" (Web app)
 * - Mô tả (Description): "DucAI Lead Webhook"
 * - Người thực thi (Execute as): Chọn "Tôi" (Me)
 * - Người có quyền truy cập (Who has access): Chọn "Bất kỳ ai" (Anyone) -> RẤT QUAN TRỌNG!
 * - Bấm nút "Triển khai" (Deploy)
 * - Cấp quyền truy cập nếu Google hỏi (Bấm Nâng cao / Advanced -> Đi tới ... (không an toàn)).
 * 
 * BƯỚC 5: Copy "URL của ứng dụng web" (dạng https://script.google.com/macros/s/AKfy.../exec)
 * và dán vào biến `googleSheetWebhookUrl` trong file `config.js` của website!
 * 
 * ==============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Khóa tránh xung đột khi nhiều người bấm cùng lúc
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    
    // Lấy thời gian hiện tại giờ Việt Nam
    var timestamp = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss");
    
    var fullName = data.fullName || "";
    var phone = data.phone || "";
    var email = data.email || "";
    var goal = data.goal || "Chưa chọn";
    var device = data.device || "Desktop / Mobile";
    var source = data.source || "Landing Page ducai.vn";
    
    // Ghi vào dòng tiếp theo của Sheet
    sheet.appendRow([
      timestamp,
      fullName,
      "'" + phone, // Thêm dấu ' để không bị mất số 0 đầu tiên
      email,
      goal,
      device,
      source
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Lead đã được lưu thành công!"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Webhook DucAI.vn đang hoạt động bình thường!").setMimeType(ContentService.MimeType.TEXT);
}
