# Tiệm Nhà Khoai — website bán hàng

Bộ mã này là một phiên bản website mới theo phong cách của website mẫu Diah.wts Shop:
- Trang sản phẩm
- Bộ lọc danh mục
- Giỏ hàng
- Thanh toán/nhập thông tin nhận hàng
- Tra cứu đơn hàng trên cùng trình duyệt
- Nút Facebook Tiệm Nhà Khoai
- Nút Shopee để bạn thay link thật

## Cần thay trước khi đăng lên GitHub Pages

1. Trong `index.html`, thay:
   `LINK_SHOPEE_CUA_BAN`
   bằng link Shopee thật.
2. Thay ảnh:
   - `logo-tiem-nha-khoai-moi.png`
   - `banner-tiem-nha-khoai.jpg`
   - `product-placeholder.jpg`
   bằng ảnh thật của shop.
3. Trong `app.js`, sửa tên/giá/ảnh sản phẩm theo danh sách thực tế.

## Đăng lên GitHub Pages

Đưa 3 file `index.html`, `style.css`, `app.js` cùng ảnh vào repository.
Sau đó vào Settings → Pages → chọn Deploy from branch → branch `main` → `/ (root)` → Save.

Lưu ý: bản mẫu này lưu giỏ hàng và đơn hàng bằng localStorage trên trình duyệt. Nó chưa có cơ sở dữ liệu/đồng bộ đơn hàng giữa các thiết bị.
