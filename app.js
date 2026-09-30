const products=[
{id:1,name:"CORTIS Ball Baby - Màu hồng",cat:"CORTIS",price:26500,img:"product-placeholder.jpg",desc:"CORTIS Ball Baby phiên bản Pink."},
{id:2,name:"CORTIS Ball Baby - Màu Xanh",cat:"CORTIS",price:26500,img:"product-placeholder.jpg",desc:"CORTIS Ball Baby phiên bản Blue."},
{id:3,name:"CORTIS Ball Baby - Màu vàng",cat:"CORTIS",price:26500,img:"product-placeholder.jpg",desc:"CORTIS Ball Baby phiên bản Yellow."},
{id:4,name:"CORTIS Ball Baby - Màu trắng",cat:"CORTIS",price:26500,img:"product-placeholder.jpg",desc:"CORTIS Ball Baby phiên bản White."},
{id:5,name:"K-POP Album - Sản phẩm mẫu",cat:"ALBUM",price:250000,img:"product-placeholder.jpg",desc:"Thay bằng ảnh và thông tin sản phẩm thật của shop."},
{id:6,name:"K-POP MD - Sản phẩm mẫu",cat:"MD",price:700000,img:"product-placeholder.jpg",desc:"Thay bằng ảnh và thông tin sản phẩm thật của shop."},
{id:7,name:"Lightstick chính thức - Sản phẩm mẫu",cat:"LIGHTSTICK",price:700000,img:"product-placeholder.jpg",desc:"Thay bằng ảnh và thông tin sản phẩm thật của shop."}
];

let cart=JSON.parse(localStorage.getItem("khoaiCart")||"[]");
const money=n=>new Intl.NumberFormat("vi-VN").format(n)+" ₫";
const save=()=>localStorage.setItem("khoaiCart",JSON.stringify(cart));

function renderProducts(cat="Tất cả"){
 const grid=document.querySelector("#productsGrid");
 const list=cat==="Tất cả"?products:products.filter(p=>p.cat===cat);
 grid.innerHTML=list.map(p=>`
  <article class="product">
    <div class="product-img"><img src="${p.img}" alt="${p.name}" onerror="this.style.display='none';this.parentElement.innerHTML='<span class=placeholder>Ảnh sản phẩm</span>'"></div>
    <div class="product-body">
      <h3>${p.name}</h3><p>${p.desc}</p><div class="price">${money(p.price)}</div>
      <button class="add" data-add="${p.id}">Thêm vào giỏ 🛒</button>
    </div>
  </article>`).join("");
 document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>add(+b.dataset.add));
}

function add(id){
 const item=cart.find(x=>x.id===id);
 if(item)item.qty++; else cart.push({id,qty:1});
 save();renderCart();openDrawer();
}
function change(id,d){
 const item=cart.find(x=>x.id===id); if(!item)return;
 item.qty+=d;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);
 save();renderCart();
}
function renderCart(){
 const wrap=document.querySelector("#cartItems");
 if(!cart.length)wrap.innerHTML='<p class="small">Giỏ hàng đang trống. Hãy chọn sản phẩm yêu thích nhé 💛</p>';
 else wrap.innerHTML=cart.map(x=>{const p=products.find(p=>p.id===x.id);return `<div class="cart-row"><div><h4>${p.name}</h4><span class="small">${money(p.price)} × ${x.qty}</span></div><div class="qty"><button data-minus="${p.id}">−</button><b>${x.qty}</b><button data-plus="${p.id}">+</button></div></div>`}).join("");
 document.querySelector("#cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 document.querySelector("#cartTotal").textContent=money(cart.reduce((s,x)=>s+(products.find(p=>p.id===x.id).price*x.qty),0));
 document.querySelectorAll("[data-minus]").forEach(b=>b.onclick=()=>change(+b.dataset.minus,-1));
 document.querySelectorAll("[data-plus]").forEach(b=>b.onclick=()=>change(+b.dataset.plus,1));
}
function openDrawer(){document.querySelector("#cartDrawer").classList.add("show")}
function closeDrawer(){document.querySelector("#cartDrawer").classList.remove("show")}

document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.cat)});
document.querySelector("#openCart").onclick=openDrawer;
document.querySelector("#closeCart").onclick=closeDrawer;
document.querySelector("#checkoutBtn").onclick=()=>{
 if(!cart.length)return alert("Giỏ hàng đang trống.");
 closeDrawer();document.querySelector("#checkoutModal").classList.add("show");
};
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>document.getElementById(b.dataset.close).classList.remove("show"));

document.querySelector("#checkoutForm").onsubmit=e=>{
 e.preventDefault();
 const order={
  code:"TNK"+Date.now().toString().slice(-8),
  phone:document.querySelector("#customerPhone").value.trim(),
  name:document.querySelector("#customerName").value.trim(),
  receiver:document.querySelector("#receiverName").value.trim(),
  address:document.querySelector("#address").value.trim(),
  items:cart,
  total:cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0),
  status:"Đã tiếp nhận"
 };
 const orders=JSON.parse(localStorage.getItem("khoaiOrders")||"[]");orders.push(order);localStorage.setItem("khoaiOrders",JSON.stringify(orders));
 cart=[];save();renderCart();document.querySelector("#checkoutModal").classList.remove("show");
 alert("Đặt hàng thành công! Mã đơn: "+order.code);
 e.target.reset();
};

document.querySelector("#lookupForm").onsubmit=e=>{
 e.preventDefault();
 const phone=document.querySelector("#lookupPhone").value.trim();
 const orders=JSON.parse(localStorage.getItem("khoaiOrders")||"[]").filter(o=>o.phone===phone);
 const box=document.querySelector("#lookupResult");
 if(!orders.length){box.innerHTML='<p class="small">Chưa tìm thấy đơn hàng với số điện thoại này.</p>';return}
 box.innerHTML=orders.map(o=>`<div class="info-grid"><article><b>Mã đơn:</b> ${o.code}<br><b>Trạng thái:</b> ${o.status}<br><b>Tổng:</b> ${money(o.total)}</article></div>`).join("");
};

renderProducts();renderCart();
