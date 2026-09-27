# TIỆM NHÀ KHOAI — V2

Website GitHub Pages theo phong cách giao diện Facebook Page trong ảnh bạn cung cấp:
- nền trắng/xanh rất nhạt
- vàng pastel
- banner + logo Tiệm nhà Khoai
- thẻ danh mục
- sản phẩm K-POP
- giỏ hàng
- form đặt hàng
- mã đơn
- tra cứu đơn bằng số điện thoại
- giao diện mobile với thanh điều hướng phía dưới

## Đưa lên GitHub
1. Tạo repository mới trên GitHub, ví dụ `tiem-nha-khoai`.
2. Upload toàn bộ nội dung trong thư mục này.
3. Settings → Pages → Deploy from a branch.
4. Branch: `main`; folder: `/ (root)`; Save.
5. Mở đường dẫn GitHub Pages mà GitHub cung cấp.

## Thay sản phẩm
Mở `app.js`, chỉnh mảng `products`.
Upload ảnh sản phẩm vào `assets/`, sau đó đổi trường `img`.

Ví dụ:
{id:8,name:"Tên album",cat:"ALBUM",price:35000,img:"assets/album1.jpg",desc:"Mô tả"}

## Thay Facebook / Instagram
Trong `app.js`, tìm `contactFacebook` và `contactInstagram` rồi thay bằng link thật của shop.

## Lưu ý về đơn hàng
Bản V2 là frontend tĩnh. Đơn hàng được lưu bằng localStorage trên thiết bị của khách, chưa gửi về máy của chủ shop.
Để sử dụng bán hàng thật, nên nối form đặt hàng với Google Sheets/Firebase/Supabase hoặc một backend. Khi đó chủ shop có thể xem đơn từ mọi điện thoại/máy tính.
